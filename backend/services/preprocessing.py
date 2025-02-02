import re
import spacy
import markdownify
from ocr import extract_text
from pathlib import Path

nlp = spacy.load("en_core_web_sm")  # For NLP tasks

def clean_text(text):
    text = re.sub(r'\s+', ' ', text)  # Remove excessive spaces
    # text = re.sub(r'[^\x00-\x7F]+', '', text)  # Remove non-ASCII chars
    return text.strip()

def structure_text(text):
    # Use NLP to split meaningful sentences
    doc = nlp(text)
    structured_text = "\n".join([sent.text for sent in doc.sents])
    
    # Convert to Markdown (headers, lists)
    markdown_text = markdownify.markdownify(structured_text)
    return markdown_text


if __name__ == "__main__":
    file_path = Path("../static/uploads/736d2a89-0634-45d0-9e4d-3701a543433b.pdf")
    file_path_1 = "../test/cleaned.txt"
    file_path_2 = "../test/strcutured.txt"
    file_path_3 = "../test/raw.txt"
    
    extracted_text = extract_text(file_path)
    with open(file_path_3, 'w', encoding='utf-8') as file:
        file.write(extracted_text)
        
    cleaned_text = clean_text(extracted_text)
    with open(file_path_1, 'w', encoding='utf-8') as file:
        file.write(cleaned_text)
        
    structured_markdown = structure_text(cleaned_text)
    with open(file_path_2, 'w', encoding='utf-8') as file:
        file.write(structured_markdown)
    