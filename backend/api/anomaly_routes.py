from fastapi import APIRouter
from services.anomaly_service import detect_market_anomaly

router = APIRouter()

@router.get("/")
def anomaly():
    return detect_market_anomaly()