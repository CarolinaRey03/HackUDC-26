from elasticsearch import Elasticsearch

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


def index_document_es(filename: str, content: str, content_type: str) -> dict:
    client = _get_es_client()
    doc = {
        "filename": filename,
        "content": content,
        "content_type": content_type,
    }
    response = client.index(index=settings.elasticsearch_index, document=doc)
    return {"id": response["_id"], "result": response["result"]}
