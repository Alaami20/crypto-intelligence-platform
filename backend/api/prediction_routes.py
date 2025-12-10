from fastapi import APIRouter
from services.prediction_service import run_predictions

router = APIRouter()

@router.get("/")
def predict():
    return run_predictions()