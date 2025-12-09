import pandas as pd
import joblib
from utils_ml import add_features

def load_latest_data(path="data/processed/prices_cleaned.csv"):
    df = pd.read_csv(path)
    df = add_features(df)
    return df.tail(1)  


def predict_next_price():
    df = load_latest_data()
    X = df.values
    rf = joblib.load("models/ml_models/random_forest.pkl")
    xgb = joblib.load("models/ml_models/xgboost.pkl")
    pred_rf = rf.predict(X)[0]
    pred_xgb = xgb.predict(X)[0]
    print("===== ML Predictions =====")
    print(f"RandomForest: {pred_rf}")
    print(f"XGBoost:      {pred_xgb}")
    return pred_rf, pred_xgb


if __name__ == "__main__":
    predict_next_price()
