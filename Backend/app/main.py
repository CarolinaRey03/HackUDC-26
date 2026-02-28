from fastapi import FastAPI
from app.routers.documents_router import router as documents_router

app = FastAPI()

app.include_router(documents_router)
