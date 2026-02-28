from fastapi import APIRouter, File, HTTPException, UploadFile, status

from app.services.documents_service import index_document

router = APIRouter(prefix="/docs")


@router.post("", status_code=status.HTTP_201_CREATED)
async def create_document(file: UploadFile = File(...)):
    try:
        return await index_document(file)
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
