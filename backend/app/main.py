from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import auth, passwords, export
from app.db.session import engine
from app.db.base import Base

app = FastAPI(title="Vault API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(passwords.router)
app.include_router(export.router)

@app.get("/")
def root():
    return {"status": "Vault API running"}
