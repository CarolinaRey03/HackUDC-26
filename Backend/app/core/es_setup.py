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
                    "chunk_index": {"type": "integer"},
                    "embedding": {
                        "type": "dense_vector",
                        "dims": settings.embedding_dims,
                        "index": True,
                        "similarity": "cosine",
                    },
                }
            }
        },
    )
