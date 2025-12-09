import { useEffect, useState } from "react";
import { getMlPrediction, getLstmPrediction } from "../api/backend";

export default function Predictions() {
  const [ml, setMl] = useState(null);
  const [lstm, setLstm] = useState(null);

  useEffect(() => {
    getMlPrediction().then(res => setMl(res.data));
    getLstmPrediction().then(res => setLstm(res.data));
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <h2 className="text-lg font-bold text-blue-300 mb-4">Predictions</h2>
      <pre className="text-sm">ML Prediction: {JSON.stringify(ml, null, 2)}</pre>
      <pre className="text-sm mt-2">LSTM Prediction: {JSON.stringify(lstm, null, 2)}</pre>
    </div>
  );
}