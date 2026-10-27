from urllib.parse import urlparse
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title="Authorized Media Tools API", version="0.1.0")

# Replace "*" with the exact deployed frontend origin before production.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

class InspectRequest(BaseModel):
    url: str = Field(min_length=8, max_length=2048)

@app.get("/health")
def health():
    return {"status": "ok", "service": "authorized-media-tools-api"}

@app.post("/inspect")
def inspect(req: InspectRequest):
    parsed = urlparse(req.url.strip())
    if parsed.scheme not in ("http", "https") or not parsed.hostname:
        raise HTTPException(status_code=400, detail="केवल valid http/https URL दें।")
    # Intentionally does not fetch or download the URL. Add only authorized,
    # platform-compliant media providers in a later implementation.
    return {
        "accepted": True,
        "host": parsed.hostname,
        "message": "URL format सही है। अभी कोई वीडियो डाउनलोड नहीं किया गया।"
    }
