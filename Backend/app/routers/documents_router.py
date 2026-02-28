from fastapi import APIRouter, File, HTTPException, UploadFile, status
from fastapi.responses import FileResponse

from app.core.logging import setup_logger
from app.schemas.documents_schemas import DocumentInfo
from app.services.documents_service import (
    get_document,
    index_document,
    list_documents,
    search_documents,
)

router = APIRouter(prefix="/docs")
_logger = setup_logger(__name__)


@router.get("/all", response_model=list[DocumentInfo])
def get_all_documents(limit: int = 100):
    try:
        return list_documents(limit)
    except Exception as e:
        _logger.exception("GET /docs/all failed: %s", e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.post("", status_code=status.HTTP_201_CREATED)
async def create_document(doc: UploadFile = File(...)):
    try:
        await index_document(doc)
    except HTTPException:
        raise
    except Exception as e:
        _logger.exception("POST /docs failed: %s", e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.get("/filtered", response_model=list[DocumentInfo])
def get_filtered_documents(query: str, limit: int = 5):
    try:
        return search_documents(query, limit)
    except Exception as e:
        _logger.exception("GET /docs/filtered failed: %s", e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.get("/{id}", response_class=FileResponse)
def get_document_by_id(id: str):
    try:
        file_path, filename, content_type = get_document(id)
        return FileResponse(path=file_path, filename=filename, media_type=content_type)
    except HTTPException:
        raise
    except Exception as e:
        _logger.exception("GET /docs/%s failed: %s", id, e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
