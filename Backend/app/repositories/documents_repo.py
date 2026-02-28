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
    chunks: list[str],
    embeddings: list[list[float]],
) -> None:
    client = _get_es_client()
    for i, embedding in enumerate(embeddings):
        client.index(
            index=settings.elasticsearch_index,
            document={
                "file_id": file_id,
                "filename": filename,
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
                    "aggs": {
                        "name": {"terms": {"field": "filename", "size": 1}}
                    },
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


def get_document_meta_es(file_id: str) -> dict | None:
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
