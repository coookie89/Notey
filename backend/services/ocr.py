import pytesseract
from pdf2image import convert_from_path
import pdfplumber
from pathlib import Path
from PIL import Image

UPLOAD_DIR = Path("uploads")

def extract_text(file_id: str):
    file_path = UPLOAD_DIR / file_id
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


if __name__ == "__main__":
    txt = extract_text("image-based-pdf-1.pdf") # test for pure img pdf
    # txt = extract_text("1d8bb968-8369-4fb8-9f59-890faad1f323.pdf") # test for pdf
    # txt = extract_text("8c5307e4-3f47-4433-adfc-4d57cfbda66b.png") # test for png
    print(txt)