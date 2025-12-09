CREATE TABLE prices_raw (
    id INT AUTO_INCREMENT PRIMARY KEY,
    timestamp DATETIME NOT NULL,
    open_price DOUBLE,
    high_price DOUBLE,
    low_price DOUBLE,
    close_price DOUBLE,
    volume DOUBLE,
    source VARCHAR(50)
);

CREATE TABLE prices_cleaned (
    id INT AUTO_INCREMENT PRIMARY KEY,
    timestamp DATETIME NOT NULL,
    open_price DOUBLE,
    high_price DOUBLE,
    low_price DOUBLE,
    close_price DOUBLE,
    volume DOUBLE
);

CREATE TABLE features (
    id INT AUTO_INCREMENT PRIMARY KEY,
    timestamp DATETIME NOT NULL,
    return_1h DOUBLE,
    return_24h DOUBLE,
    volatility DOUBLE,
    moving_avg_7 DOUBLE,
    moving_avg_30 DOUBLE,
    rsi DOUBLE,
    macd DOUBLE
);

CREATE TABLE predictions_ml (
    id INT AUTO_INCREMENT PRIMARY KEY,
    timestamp DATETIME NOT NULL,
    model_name VARCHAR(100),
    predicted_price DOUBLE,
    confidence DOUBLE
);

CREATE TABLE predictions_lstm (
    id INT AUTO_INCREMENT PRIMARY KEY,
    timestamp DATETIME NOT NULL,
    horizon INT,
    predicted_price DOUBLE,
    confidence DOUBLE
);

CREATE TABLE anomalies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    timestamp DATETIME NOT NULL,
    type VARCHAR(50),
    severity DOUBLE,
    description TEXT
);
