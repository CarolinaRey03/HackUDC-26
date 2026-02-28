from typing import Optional
from os.path import splitext
from elasticsearch import Elasticsearch, NotFoundError

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


def index_document_es(
    file_id: str,
    filename: str,
    content_type: str,
    embeddings: list[list[float]],
) -> None:
    client = _get_es_client()
    for i, embedding in enumerate(embeddings):
        client.index(
            index=settings.elasticsearch_index,
            document={
                "file_id": file_id,
                "filename": filename,
                "file_type": splitext(filename)[1],
                "content_type": content_type,
                "chunk_index": i,
                "embedding": embedding,
            },
        )


def list_documents_es(limit: int = 100) -> list[dict]:
    client = _get_es_client()
    response = client.search(
        index=settings.elasticsearch_index,
        body={
            "size": 0,
            "aggs": {
                "files": {
                    "terms": {"field": "file_id", "size": limit},
                    "aggs": {"name": {"terms": {"field": "filename", "size": 1}}},
                }
            },
        },
    )
    return [
        {
            "id": bucket["key"],
            "name": bucket["name"]["buckets"][0]["key"],
        }
        for bucket in response["aggregations"]["files"]["buckets"]
    ]


def search_documents_es(embedding: list[float], limit: int = 5) -> list[dict]:
    client = _get_es_client()
    response = client.search(
        index=settings.elasticsearch_index,
        body={
            "knn": {
                "field": "embedding",
                "query_vector": embedding,
                "k": limit * 3,
                "num_candidates": limit * 30,
            },
            "_source": ["file_id", "filename"],
        },
    )
    seen: set[str] = set()
    results: list[dict] = []
    for hit in response["hits"]["hits"]:
        fid = hit["_source"]["file_id"]
        if fid not in seen:
            seen.add(fid)
            results.append({"id": fid, "name": hit["_source"]["filename"]})
        if len(results) >= limit:
            break
    return results


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
