import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:8080/api" });
export const getMlPrediction = () => API.get("/predict/ml");
export const getLstmPrediction = () => API.get("/predict/lstm");
export const getIsoforestAnomalies = () => API.get("/anomaly/isoforest");
export const getLstmAnomalies = () => API.get("/anomaly/lstm");
export const chatWithBot = (msg) => API.get(`/chat?message=${msg}`);