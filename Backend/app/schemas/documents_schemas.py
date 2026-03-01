from typing import Optional
from pydantic import BaseModel


class DocumentInfo(BaseModel):
    id: str
    name: str
    title: Optional[str] = None
    author: Optional[str] = None
    category: Optional[str] = None
    created_at: Optional[int] = None
    file_type: Optional[str] = None
    language: Optional[str] = None
    size: Optional[int] = None


class SearchRequest(BaseModel):
    query: str
    limit: int = 10
