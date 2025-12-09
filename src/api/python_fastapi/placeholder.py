from fastapi import FastAPI
import uvicorn

from src.ml.predict_ml import predict_next_price
from src.dl.lstm_predict import predict_lstm
from src.anomaly.detect_isoforest import detect_with_isoforest
from src.anomaly.detect_lstm import detect_lstm_anomalies

app = FastAPI(
    title="Crypto Intelligence Platform API",
    description="AI/ML/LSTM/Anomaly services backend",
    version="1.0.0"
)


@app.get("/predict/ml")
def ml_prediction():
    pred_rf, pred_xgb = predict_next_price()
    return {
        "RandomForest": pred_rf,
        "XGBoost": pred_xgb
    }



@app.get("/predict/lstm")
def lstm_prediction():
    prediction = predict_lstm()
    return {"LSTM_prediction": prediction}



@app.get("/detect/anomaly/isoforest")
def anomaly_isoforest():
    df = detect_with_isoforest()
    return {
        "count": len(df),
        "anomalies": df.to_dict(orient="records")
    }

@app.get("/detect/anomaly/lstm")
def anomaly_lstm():
    df = detect_lstm_anomalies()
    return {
        "count": len(df),
        "anomalies": df.to_dict(orient="records")
    }



@app.get("/chat")
def chat(message: str):
    return {
        "response": f"(Chatbot coming soon) You said: {message}"
    }


if __name__ == "__main__":
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)

