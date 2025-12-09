import pandas as pd
import numpy as np

def compute_returns(df):
    """
    Add percentage returns and volatility features.
    """
    df["return_1"] = df["close_price"].pct_change(1)
    df["return_6"] = df["close_price"].pct_change(6)
    df["return_24"] = df["close_price"].pct_change(24)
    df["volatility_6"] = df["close_price"].rolling(6).std()
    df = df.dropna()
    return df


def zscore_series(series):
    """
    Compute z-score for anomaly detection.
    """
    mean = series.mean()
    std = series.std()
    return (series - mean) / std


def detect_zscore_anomalies(df, threshold=3):
    """
    Detect anomalies where Z-score of return exceeds the threshold.
    """
    df = df.copy()
    df["zscore"] = zscore_series(df["return_1"])

    anomalies = df[df["zscore"].abs() > threshold]

    return anomalies[["open_time", "close_price", "return_1", "zscore"]]
