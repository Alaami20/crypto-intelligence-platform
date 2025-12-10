import numpy as np
import pandas as pd
import joblib
from tensorflow.keras.models import load_model # type: ignore

from utils_dl import create_sequences
from utils_dl import add_features




DATA_PATH = "data/processed/prices_cleaned.csv"
MODEL_PATH = "models/dl_models/lstm_model.h5"


def prepare_last_sequence():
    df = pd.read_csv(DATA_PATH)
    df = add_features(df)
    feature_cols = df.drop(columns=["open_time"]).columns
    values = df[feature_cols].values
    scaler = joblib.load("models/dl_models/scaler.pkl")
    mean, std = scaler["mean"], scaler["std"]

    values_norm = (values - mean) / std

    seq = values_norm[-48:]  
    return np.array([seq]), mean, std


def predict_lstm():
    model = load_model(MODEL_PATH)

    X_last, mean, std = prepare_last_sequence()

    pred_norm = model.predict(X_last)[0][0]
    pred_value = pred_norm * std + mean  

    print("==============================")
    print("      LSTM Prediction")
    print("==============================")
    print("Next-hour predicted price:", pred_value)

    return pred_value


if __name__ == "__main__":
    predict_lstm()
