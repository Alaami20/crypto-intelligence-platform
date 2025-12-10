from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.router import api_router
from utils.logger import logger

app = FastAPI(title="Crypto AI Platform", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    logger.info("🚀 Backend started successfully.")

app.include_router(api_router)

@app.get("/")
def root():
    return {"status": "running", "message": "Crypto AI Platform Backend Active"}