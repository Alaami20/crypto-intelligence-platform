from src.anomaly.detector import anomaly_score

def detect_market_anomaly():
    score = anomaly_score()
    return {"anomaly_score": float(score)}
