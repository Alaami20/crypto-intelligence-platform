import pandas as pd
import joblib
from sklearn.ensemble import RandomForestRegressor
from xgboost import XGBRegressor # type: ignore

from utils_ml import add_features


def load_data(path="data/processed/prices_cleaned.csv"):
    df = pd.read_csv(path)
    df = add_features(df)
    return df

def train_models():
    df = load_data()
    df["target"] = df["close_price"].shift(-1)
    df = df.dropna()
    features = df.drop(columns=["target", "open_time"])
    X = features.values
    y = df["target"].values
    rf = RandomForestRegressor(n_estimators=200)
    rf.fit(X, y)
    joblib.dump(rf, "models/ml_models/random_forest.pkl")
    print("✔ RandomForest trained and saved")
    xgb = XGBRegressor(
        n_estimators=300,
        learning_rate=0.05,
        max_depth=6,
        subsample=0.8,
        colsample_bytree=0.8
    )
    xgb.fit(X, y)
    joblib.dump(xgb, "models/ml_models/xgboost.pkl")
    print("✔ XGBoost trained and saved")


if __name__ == "__main__":
    train_models()
