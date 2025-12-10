from fastapi import APIRouter
from .prediction_routes import router as prediction_router
from .anomaly_routes import router as anomaly_router
from .chatbot_routes import router as chatbot_router

api_router = APIRouter()

api_router.include_router(prediction_router, prefix="/predict", tags=["Prediction"])
api_router.include_router(anomaly_router, prefix="/anomaly", tags=["Anomaly"])
api_router.include_router(chatbot_router, prefix="/chatbot", tags=["Chatbot"])
