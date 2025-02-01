from fastapi import APIRouter, HTTPException
from fastapi.responses import PlainTextResponse
from pathlib import Path
from services.ocr import extract_text
from services.llm import generate_markdown_notes

router = APIRouter()
UPLOAD_DIR = Path("uploads")

@router.get("/process/{file_id}")
async def get_markdown(file_id: str):
    file = UPLOAD_DIR / file_id
    
    if not file.exists():
        raise HTTPException(status_code=404, detail="File not found")
    
    file_txt = extract_text(file)  # convert file (pdf/img/png etc) into txt
    md = generate_markdown_notes(file_txt)  # use llm model to generate markdown
    
    md_file = file.with_suffix(".md")
    md_file.write_text(md)  # Save markdown file
    
    return PlainTextResponse(md)