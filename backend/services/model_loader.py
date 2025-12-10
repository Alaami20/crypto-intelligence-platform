from src.ml.model import RandomForestModel
from src.dl.lstm_model import LSTMModel

def load_models():
    return {
        "rf": RandomForestModel(),
        "lstm": LSTMModel()
    }
