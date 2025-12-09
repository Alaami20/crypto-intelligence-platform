import pandas as pd
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from tensorflow.keras.callbacks import EarlyStopping
import joblib
import os

from utils_dl import create_sequences
from utils_ml import add_features


DATA_PATH = "data/processed/prices_cleaned.csv"
MODEL_PATH = "models/dl_models/lstm_model.h5"


def load_and_prepare():
    df = pd.read_csv(DATA_PATH)
    df = add_features(df)
    feature_cols = df.drop(columns=["open_time"]).columns
    values = df[feature_cols].values
    mean = values.mean()
    std = values.std()
    values = (values - mean) / std

    joblib.dump({"mean": mean, "std": std}, "models/dl_models/scaler.pkl")

    X, y = create_sequences(values, seq_length=48)
    return X, y, feature_cols


def build_lstm(input_shape):
    model = Sequential()
    model.add(LSTM(64, return_sequences=True, input_shape=input_shape))
    model.add(Dropout(0.2))
    model.add(LSTM(32))
    model.add(Dense(1))

    model.compile(optimizer="adam", loss="mse")
    return model


def train_lstm():
    os.makedirs("models/dl_models", exist_ok=True)

    X, y, feature_cols = load_and_prepare()

    model = build_lstm((X.shape[1], X.shape[2]))

    early = EarlyStopping(monitor="loss", patience=10, restore_best_weights=True)

    model.fit(
        X, y,
        epochs=50,
        batch_size=32,
        callbacks=[early],
        verbose=1
    )

    model.save(MODEL_PATH)
    print("✔ LSTM model trained and saved at:", MODEL_PATH)


if __name__ == "__main__":
    train_lstm()
