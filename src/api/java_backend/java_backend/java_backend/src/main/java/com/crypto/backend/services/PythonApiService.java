package com.crypto.backend.services;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class PythonApiService {

    private final WebClient client = WebClient.create("http://localhost:8000");

    public String getMlPrediction() {
        return client.get().uri("/predict/ml").retrieve().bodyToMono(String.class).block();
    }

    public String getLstmPrediction() {
        return client.get().uri("/predict/lstm").retrieve().bodyToMono(String.class).block();
    }

    public String getIsoforestAnomalies() {
        return client.get().uri("/detect/anomaly/isoforest").retrieve().bodyToMono(String.class).block();
    }

    public String getLstmAnomalies() {
        return client.get().uri("/detect/anomaly/lstm").retrieve().bodyToMono(String.class).block();
    }

    public String chat(String message) {
        return client.get()
                .uri(uriBuilder -> uriBuilder.path("/chat").queryParam("message", message).build())
                .retrieve()
                .bodyToMono(String.class).block();
    }
}
