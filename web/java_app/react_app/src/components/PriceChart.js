import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

export default function PriceChart() {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPrices(prev => [...prev.slice(-100), parseFloat(data.p)]);
    };
    return () => ws.close();
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <h2 className="text-lg mb-3 font-bold text-green-300">BTC/USDT Live Price</h2>
      <Line data={{
        labels: prices.map((_, i) => i),
        datasets: [{ label: "BTC Price", data: prices, borderColor: "rgb(34,197,94)", tension: 0.2 }]
      }}/>
    </div>
  );
}