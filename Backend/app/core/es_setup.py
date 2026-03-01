import time
import logging
from elasticsearch import Elasticsearch, ConnectionError

from app.config import settings

logger = logging.getLogger(__name__)


def init_index(client: Elasticsearch) -> None:
    index = settings.elasticsearch_index
    
    cnt = 0
    while True:
        try:
            if client.indices.exists(index=index):
                logger.info(f"Index '{index}' already exists.")
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
            logger.info(f"Index '{index}' created successfully.")
            return
        except ConnectionError:
            time.sleep(5)
            logger.warning(f"Elasticsearch not ready (attempt {cnt+1}). Retrying in 5s...")
            cnt += 1
