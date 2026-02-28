from elasticsearch import Elasticsearch

from app.config import settings


def init_index(client: Elasticsearch) -> None:
    index = settings.elasticsearch_index
    if client.indices.exists(index=index):
        return

    client.indices.create(
        index=index,
        body={
            "mappings": {
                "properties": {
                    "file_id": {"type": "keyword"},
                    "filename": {"type": "keyword"},
                    "file_type": {"type": "keyword"},
                    "content_type": {"type": "keyword"},
                    "language": {"type": "keyword"},
                    "chunk_index": {"type": "integer"},
                    "created_at": {"type": "long"},
                    "content": {"type": "text"},
                    "embedding": {
                        "type": "dense_vector",
                        "dims": settings.embedding_dims,
                        "index": True,
                        "similarity": "cosine",
                    },
                }
            },
        },
    )
