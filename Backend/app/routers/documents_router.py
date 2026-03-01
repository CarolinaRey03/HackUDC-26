from typing import Optional
from fastapi import APIRouter, File, HTTPException, UploadFile, status
from fastapi.responses import FileResponse

from app.core.logging import setup_logger
from app.schemas.documents_schemas import DocumentInfo
from app.services.documents_service import (
    delete_document,
    get_document,
    index_document,
    list_documents,
    search_documents,
    get_all_documents_filtered
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
def get_filtered_documents(limit: int = 5, query: Optional[str] = None, language: Optional[str] = None, type: Optional[str] = None, date: Optional[int] = None):
    try:
        if query:
            return search_documents(limit, query, language=language, type=type, date=date)

        return get_all_documents_filtered(limit, language=language, type=type, date=date)
    except Exception as e:
        _logger.exception("GET /docs/filtered failed: %s", e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_document_by_id(id: str):
    try:
        delete_document(id)
    except HTTPException:
        raise
    except Exception as e:
        _logger.exception("DELETE /docs/%s failed: %s", id, e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.get("/{id}", response_class=FileResponse)
def get_document_by_id(id: str):
    try:
        file_path, filename, content_type = get_document(id)
        response = FileResponse(
            path=file_path,
            media_type=content_type,
            content_disposition_type="inline",
        )
        response.headers["Content-Disposition"] = f'inline; filename="{filename}"'
        return response
    except HTTPException:
        raise
    except Exception as e:
        _logger.exception("GET /docs/%s failed: %s", id, e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
