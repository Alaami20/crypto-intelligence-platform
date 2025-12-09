import requests
import pandas as pd
import os

RAW_PATH = "data/raw/"
PROCESSED_PATH = "data/processed/"

def download_binance_ohlcv(symbol="BTCUSDT", interval="1h", limit=1000):
    """
    Downloads OHLCV data from Binance API.
    """
    url = "https://api.binance.com/api/v3/klines"
    params = {"symbol": symbol, "interval": interval, "limit": limit}

    response = requests.get(url, params=params)

    if response.status_code != 200:
        raise Exception("Error fetching Binance data:", response.text)

    data = response.json()

    df = pd.DataFrame(data, columns=[
        "open_time", "open", "high", "low", "close", "volume",
        "close_time", "quote_asset_volume", "number_of_trades",
        "taker_buy_base", "taker_buy_quote", "ignore"
    ])

    # Cast numeric columns
    for col in ["open", "high", "low", "close", "volume"]:
        df[col] = df[col].astype(float)

    # Convert timestamps
    df["open_time"] = pd.to_datetime(df["open_time"], unit="ms")
    df["close_time"] = pd.to_datetime(df["close_time"], unit="ms")

    # Save raw CSV
    os.makedirs(RAW_PATH, exist_ok=True)
    df.to_csv(f"{RAW_PATH}{symbol}_{interval}_raw.csv", index=False)

    print("✔ Raw data downloaded from Binance")
    return df


def clean_ohlcv(df):
    df = df.rename(columns={
        "open": "open_price",
        "high": "high_price",
        "low": "low_price",
        "close": "close_price"
    })

    df = df[["open_time", "open_price", "high_price", "low_price", "close_price", "volume"]]
    df = df.dropna()

    os.makedirs(PROCESSED_PATH, exist_ok=True)
    df.to_csv(f"{PROCESSED_PATH}prices_cleaned.csv", index=False)

    print("✔ Cleaned OHLCV saved")
    return df


def run_etl():
    df_raw = download_binance_ohlcv("BTCUSDT", "1h", limit=1000)
    df_clean = clean_ohlcv(df_raw)
    print("✔ ETL Pipeline Completed")
    return df_clean


if __name__ == "__main__":
    run_etl()
