import pytesseract
from pdf2image import convert_from_path
import pdfplumber
from pathlib import Path
from PIL import Image

def extract_text(file_path: str):
    text = ""

    if file_path.suffix == ".pdf":        
        with pdfplumber.open(file_path) as pdf:
            for i, page in enumerate(pdf.pages):
                page_text = page.extract_text() or ""  # Extract text if available
                text += f"Page {i + 1} / {len(pdf.pages)}\n"
                if page_text:
                    text += page_text + "\n"
                
                if not page_text and page.images:  # If no text on the page, apply OCR
                    img = page.to_image().annotated  # Convert pdf page to PIL image
                    ocr_text = pytesseract.image_to_string(img)
                    text += f"[Below Text is Extracted by OCR]\n{ocr_text}\n"
                
    else:  # If it's an image file
        img = Image.open(file_path)
        ocr_text = pytesseract.image_to_string(img)
        text = f"[Below Text is Extracted by OCR]\n{ocr_text}\n"
    
    return text