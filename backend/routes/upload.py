from fastapi import APIRouter, UploadFile, File
import shutil
import uuid
from pathlib import Path

router = APIRouter()

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_id = str(uuid.uuid4()) + Path(file.filename).suffix
    file_path = UPLOAD_DIR / file_id
    
    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    return {"file_id": file_id, "message": "File uploaded successfully."}