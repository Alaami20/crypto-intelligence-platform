import pandas as pd

def add_features(df):
    """
    Add basic ML features to cleaned OHLCV.
    """
    df = df.copy()
    df["return_1"] = df["close_price"].pct_change(1)
    df["return_6"] = df["close_price"].pct_change(6)
    df["return_24"] = df["close_price"].pct_change(24)
    df["ma_7"] = df["close_price"].rolling(7).mean()
    df["ma_25"] = df["close_price"].rolling(25).mean()
    df["volatility_6"] = df["close_price"].rolling(6).std()
    df = df.dropna()
    return df
