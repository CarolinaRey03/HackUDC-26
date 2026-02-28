from fastapi import FastAPI
from app.routers.documents_router import router as documents_router
from app.core.es_setup import init_index
from app.repositories.documents_repo import _get_es_client
import time
import logging

app = FastAPI()

app.include_router(documents_router)


@app.on_event("startup")
async def startup():
    es_client = _get_es_client() 
    
    max_intentos = 10
    for intento in range(max_intentos):
        try:
            init_index(es_client)
            logging.info("¡Conectado a Elasticsearch y configurado con éxito!")
            break
        except Exception as e:
            logging.warning(f"Elasticsearch no está listo. Reintentando en 3s... (Intento {intento + 1}/{max_intentos})")
            time.sleep(3)
            if intento == max_intentos - 1:
                logging.error("No se pudo conectar a Elasticsearch después de varios intentos.")
                raise e # Si fa
