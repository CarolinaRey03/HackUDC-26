from pydantic import BaseModel


class DocumentInfo(BaseModel):
    id: str
    name: str


class SearchRequest(BaseModel):
    query: str
    limit: int = 5
