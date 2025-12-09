import numpy as np
import pandas as pd

def create_sequences(data, seq_length=48):
    """
    Converts OHLCV feature data into sequences for LSTM.
    seq_length = number of past hours used to predict the next hour.
    """
    xs, ys = [], []

    for i in range(len(data) - seq_length):
        x_seq = data[i:(i + seq_length)]
        y_seq = data[i + seq_length]  # next value

        xs.append(x_seq)
        ys.append(y_seq)

    return np.array(xs), np.array(ys)
