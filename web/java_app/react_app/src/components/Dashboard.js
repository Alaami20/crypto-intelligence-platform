import PriceChart from "./PriceChart";
import Predictions from "./Predictions";
import Anomalies from "./Anomalies";
import Chatbot from "./Chatbot";

export default function Dashboard() {
  return (
    <div className="p-6 grid grid-cols-2 gap-6">
      <PriceChart />
      <Predictions />
      <Anomalies />
      <Chatbot />
    </div>
  );
}