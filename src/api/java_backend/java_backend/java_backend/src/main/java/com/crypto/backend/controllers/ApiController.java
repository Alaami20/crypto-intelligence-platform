package com.crypto.backend.controllers;

import com.crypto.backend.services.PythonApiService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ApiController {

    private final PythonApiService pythonService;

    public ApiController(PythonApiService pythonService) {
        this.pythonService = pythonService;
    }

    @GetMapping("/predict/ml")
    public String getMlPrediction() {
        return pythonService.getMlPrediction();
    }

    @GetMapping("/predict/lstm")
    public String getLstmPrediction() {
        return pythonService.getLstmPrediction();
    }

    @GetMapping("/anomaly/isoforest")
    public String getIsoforest() {
        return pythonService.getIsoforestAnomalies();
    }

    @GetMapping("/anomaly/lstm")
    public String getLstmAnomaly() {
        return pythonService.getLstmAnomalies();
    }

    @GetMapping("/chat")
    public String chat(@RequestParam String message) {
        return pythonService.chat(message);
    }
}
