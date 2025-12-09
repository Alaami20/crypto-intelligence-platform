export default function Navbar() {
  return (
    <nav className="bg-gray-900 p-4 flex justify-between">
      <h1 className="text-xl font-bold text-green-400">Crypto Intelligence Platform</h1>
      <div className="flex gap-6 text-gray-300">
        <a href="#" className="hover:text-white">Dashboard</a>
        <a href="#" className="hover:text-white">Predictions</a>
        <a href="#" className="hover:text-white">Anomalies</a>
        <a href="#" className="hover:text-white">Chatbot</a>
      </div>
    </nav>
  );
}