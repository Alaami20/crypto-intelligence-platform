import numpy as np
import pandas as pd
import joblib
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import LSTM, Dense
from utils_anomaly import compute_returns
import os


MODEL_PATH = "models/dl_models/lstm_autoencoder.h5"
SCALER_PATH = "models/dl_models/auto_scaler.pkl"

def build_autoencoder(seq_length, n_features):
    model = Sequential([
        LSTM(64, activation="relu", return_sequences=True, input_shape=(seq_length, n_features)),
        LSTM(32, activation="relu", return_sequences=False),
        Dense(32, activation="relu"),
        Dense(seq_length * n_features, activation="linear")
    ])
    model.compile(optimizer="adam", loss="mse")
    return model

def train_lstm_autoencoder(data_path="data/processed/prices_cleaned.csv", seq_length=32):
    df = pd.read_csv(data_path)
    df = compute_returns(df)

    feature_cols = ["return_1", "return_6", "return_24", "volatility_6"]
    data = df[feature_cols].values

    mean, std = data.mean(), data.std()
    data_norm = (data - mean) / std
    joblib.dump({"mean": mean, "std": std}, SCALER_PATH)

    X = []
    for i in range(len(data_norm) - seq_length):
        X.append(data_norm[i:i+seq_length])
    X = np.array(X)

    model = build_autoencoder(seq_length, len(feature_cols))

    os.makedirs("models/dl_models", exist_ok=True)
    model.fit(X, X.reshape(X.shape[0], -1), epochs=20, batch_size=32)

    model.save(MODEL_PATH)
    print("✔ LSTM Autoencoder trained and saved.")

def detect_lstm_anomalies(data_path="data/processed/prices_cleaned.csv", seq_length=32, threshold_factor=2.5):
    df = pd.read_csv(data_path)
    df = compute_returns(df)
    feature_cols = ["return_1", "return_6", "return_24", "volatility_6"]
    data = df[feature_cols].values
    scaler = joblib.load(SCALER_PATH)
    mean, std = scaler["mean"], scaler["std"]
    data_norm = (data - mean) / std
    model = load_model(MODEL_PATH)
    X = []
    for i in range(len(data_norm) - seq_length):
        X.append(data_norm[i:i + seq_length])
    X = np.array(X)
    preds = model.predict(X)
    preds = preds.reshape(X.shape[0], seq_length, len(feature_cols))
    errors = np.mean((preds - X) ** 2, axis=(1, 2))
    threshold = errors.mean() + threshold_factor * errors.std()
    anomaly_indexes = np.where(errors > threshold)[0]
    anomaly_rows = df.iloc[anomaly_indexes]
    print("===== LSTM Autoencoder Anomalies =====")
    print(anomaly_rows[["open_time", "close_price", "return_1"]])
    return anomaly_rows


if __name__ == "__main__":
    train_lstm_autoencoder()
    detect_lstm_anomalies()
