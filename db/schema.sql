CREATE TABLE prices_raw (
    id INT IDENTITY(1,1) PRIMARY KEY,
    timestamp DATETIME2 NOT NULL,
    open_price FLOAT,
    high_price FLOAT,
    low_price FLOAT,
    close_price FLOAT,
    volume FLOAT,
    source NVARCHAR(50)
);

CREATE TABLE prices_cleaned (
    id INT IDENTITY(1,1) PRIMARY KEY,
    timestamp DATETIME2 NOT NULL,
    open_price FLOAT,
    high_price FLOAT,
    low_price FLOAT,
    close_price FLOAT,
    volume FLOAT
);

CREATE TABLE features (
    id INT IDENTITY(1,1) PRIMARY KEY,
    timestamp DATETIME2 NOT NULL,
    return_1h FLOAT,
    return_24h FLOAT,
    volatility FLOAT,
    moving_avg_7 FLOAT,
    moving_avg_30 FLOAT,
    rsi FLOAT,
    macd FLOAT
);

CREATE TABLE predictions_ml (
    id INT IDENTITY(1,1) PRIMARY KEY,
    timestamp DATETIME2 NOT NULL,
    predicted_return FLOAT,
    model_version NVARCHAR(20)
);
