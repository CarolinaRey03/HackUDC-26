from fastapi import FastAPI
from app.routers.documents_router import router as documents_router
from app.core.es_setup import init_index
from app.repositories.documents_repo import _get_es_client

app = FastAPI()

app.include_router(documents_router)


@app.on_event("startup")
def startup() -> None:
    init_index(_get_es_client())
