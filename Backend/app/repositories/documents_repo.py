from typing import Optional
from os.path import splitext
from elasticsearch import Elasticsearch, NotFoundError
import time

from app.config import settings

_client: Elasticsearch | None = None


def _get_es_client() -> Elasticsearch:
    global _client
    if _client is None:
        _client = Elasticsearch(
            settings.elasticsearch_url,
            basic_auth=(settings.elasticsearch_user, settings.elasticsearch_password),
        )
    return _client


def analyze_text_es(text: str, language: str) -> str:
    """Returns the text after applying stopword removal (Spanish)."""
    analyzer = "spanish" if language == "es" else "english"

    client = _get_es_client()
    response = client.indices.analyze(
        body={"analyzer": analyzer, "text": text},
    )

    return " ".join(token["token"] for token in response["tokens"])


def index_document_es(
    file_id: str,
    filename: str,
    content_type: str,
    language: str,
    chunks: list[str],
    embeddings: list[list[float]],
    chunks: list[str],
) -> None:
    client = _get_es_client()
    created_at = int(time.time())
    for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
        client.index(
            index=settings.elasticsearch_index,
            document={
                "file_id": file_id,
                "filename": filename,
                "file_type": splitext(filename)[1],
                "content_type": content_type,
                "language": language,
                "content": chunk,
                "chunk_index": i,
                "embedding": embedding,
                "created_at": created_at,
            },
        )


def list_documents_es(
    limit: int = 100,
    language: Optional[str] = None,
    file_type: Optional[str] = None,
    date: Optional[int] = None,
) -> list[dict]:
    client = _get_es_client()
    filters = _build_search_filters(language, file_type, date)

    body: dict = {
        "size": 0,
        "aggs": {
            "files": {
                "terms": {"field": "file_id", "size": limit},
                "aggs": {"name": {"terms": {"field": "filename", "size": 1}}},
            }
        },
    }

    if filters:
        body["query"] = {"bool": {"filter": filters}}

    response = client.search(
        index=settings.elasticsearch_index,
        body=body,
    )

    return [
        {
            "id": bucket["key"],
            "name": bucket["name"]["buckets"][0]["key"],
        }
        for bucket in response["aggregations"]["files"]["buckets"]
    ]


def search_documents_es(
    embedding: list[float],
    limit: int = 5,
    language: Optional[str] = None,
    file_type: Optional[str] = None,
    date: Optional[int] = None,
) -> list[dict]:
    client = _get_es_client()

    filters = _build_search_filters(language=language, file_type=file_type, date=date)

    body: dict = {
        "knn": {
            "field": "embedding",
            "query_vector": embedding,
            "k": limit * 3,
            "num_candidates": limit * 30,
        },
            # AÑADIDO: Pedimos a Elasticsearch que nos devuelva también el 'content'
        "_source": ["file_id", "filename", "content"],
    }

    if filters:
        body["query"] = {"bool": {"filter": filters}}

    response = client.search(index=settings.elasticsearch_index, body=body)

    seen: set[str] = set()
    results: list[dict] = []
    for hit in response["hits"]["hits"]:
        fid = hit["_source"]["file_id"]
        if fid not in seen:
            seen.add(fid)
            # AÑADIDO: Devolvemos el fragmento de texto que hizo match
            results.append({
                "id": fid, 
                "name": hit["_source"]["filename"],
                "match_text": hit["_source"].get("content", "")
            })
        if len(results) >= limit:
            break
    return results


def _build_search_filters(
    language: Optional[str] = None,
    file_type: Optional[str] = None,
    date: Optional[int] = None,
) -> list[dict]:
    filters: list[dict] = []
    if language:
        filters.append({"term": {"language.keyword": language}})
    if file_type:
        filters.append({"term": {"file_type.keyword": file_type}})
    if date is not None:
        filters.append({"range": {"created_at": {"gte": date}}})
    return filters


def delete_document_es(file_id: str) -> bool:
    """Returns False if no documents were found for this file_id."""
    client = _get_es_client()
    response = client.delete_by_query(
        index=settings.elasticsearch_index,
        body={"query": {"term": {"file_id": file_id}}},
    )
    return response["deleted"] > 0


def get_document_metadata_es(file_id: str) -> Optional[dict]:
    client = _get_es_client()
    try:
        response = client.search(
            index=settings.elasticsearch_index,
            body={
                "query": {"term": {"file_id": file_id}},
                "_source": ["filename", "content_type"],
                "size": 1,
            },
        )
    except NotFoundError:
        return None
    hits = response["hits"]["hits"]
    if not hits:
        return None
    return {
        "filename": hits[0]["_source"]["filename"],
        "content_type": hits[0]["_source"]["content_type"],
    }