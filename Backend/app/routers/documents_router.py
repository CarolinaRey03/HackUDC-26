from fastapi import APIRouter, status 

router = APIRouter(prefix="/docs")


@router.post("", status_code=status.HTTP_201_CREATED)
async def create_document():
    pass
