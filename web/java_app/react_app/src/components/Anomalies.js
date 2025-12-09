import { useEffect, useState } from "react";
import { getIsoforestAnomalies } from "../api/backend";

export default function Anomalies() {
  const [anoms, setAnoms] = useState([]);

  useEffect(() => {
    getIsoforestAnomalies().then(res => setAnoms(res.data.anomalies));
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <h2 className="text-lg font-bold text-red-300 mb-4">Anomaly Alerts</h2>
      <ul>
        {anoms.map((a, i) => (
          <li key={i} className="p-2 mb-2 bg-gray-700 rounded">{JSON.stringify(a)}</li>
        ))}
      </ul>
    </div>
  );
}