import pandas as pd
from sklearn.ensemble import IsolationForest
from utils_anomaly import compute_returns
import joblib
import os


MODEL_PATH = "models/ml_models/isoforest.pkl"


def train_isolation_forest(data_path="data/processed/prices_cleaned.csv"):
    df = pd.read_csv(data_path)
    df = compute_returns(df)
    features = df[["return_1", "return_6", "return_24", "volatility_6"]]
    model = IsolationForest(
        n_estimators=300,
        contamination=0.02,  # 2% considered anomalies
        random_state=42
    )
    model.fit(features)
    os.makedirs("models/ml_models/", exist_ok=True)
    joblib.dump(model, MODEL_PATH)
    print("✔ Isolation Forest trained and saved.")
    return model


def detect_with_isoforest(data_path="data/processed/prices_cleaned.csv"):
    df = pd.read_csv(data_path)
    df = compute_returns(df)
    features = df[["return_1", "return_6", "return_24", "volatility_6"]]

    model = joblib.load(MODEL_PATH)
    preds = model.predict(features)  
    df["isoforest_flag"] = preds
    anomalies = df[df["isoforest_flag"] == -1]
    print("===== Isolation Forest Anomalies =====")
    print(anomalies[["open_time", "close_price", "return_1", "isoforest_flag"]])

    return anomalies


if __name__ == "__main__":
    train_isolation_forest()
    detect_with_isoforest()
