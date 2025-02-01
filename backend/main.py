from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import upload, process
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Mount the static files so they can be accessed via HTTP
app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(upload.router)
app.include_router(process.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)