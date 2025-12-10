from .model_loader import load_models

models = load_models()

def run_predictions():
    rf_pred = models["rf"].predict()
    lstm_pred = models["lstm"].predict()

    return {
        "ml_prediction": rf_pred,
        "dl_prediction": lstm_pred
    }
