import io

from fastapi import HTTPException, UploadFile, status

from PyPDF2 import PdfReader
from app.core.logging import setup_logger
from app.repositories.documents_repo import index_document_es
from odf.opendocument import load

from odf.text import P

from docx import Document

_logger = setup_logger(__name__)


async def index_document(file: UploadFile) -> dict:
    content = await file.read()
    text = _extract_text(content, file.content_type or "", file.filename or "")
    return index_document_es(
        filename=file.filename or "",
        content=text,
        content_type=file.content_type or "",
    )


def _extract_text(content: bytes, content_type: str, filename: str) -> str:
    ct = (content_type or "").lower()
    name = (filename or "").lower()

    if ct == "application/pdf" and name.endswith(".pdf"):
        reader = PdfReader(io.BytesIO(content))
        text = "\n".join(page.extract_text() for page in reader.pages)
        _logger.debug("\n".join(text.splitlines()[:6]))
        return text

    if (
        ct == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        and name.endswith(".docx")
    ):
        doc = Document(io.BytesIO(content))
        return "\n".join(p.text for p in doc.paragraphs)

    if ct == "application/vnd.oasis.opendocument.text" and name.endswith(".odt"):
        odf_doc = load(io.BytesIO(content))
        return "\n".join(str(p) for p in odf_doc.body.getElementsByType(P))

    if ct == "text/plain" and name.endswith(".txt"):
        return content.decode("utf-8", errors="replace")

    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST, detail="Document format is not valid"
    )
