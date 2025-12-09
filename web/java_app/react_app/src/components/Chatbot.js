import { useState } from "react";
import { chatWithBot } from "../api/backend";

export default function Chatbot() {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");

  const send = () => {
    chatWithBot(msg).then(res => setReply(res.data.response));
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <h2 className="text-lg font-bold text-yellow-300 mb-4">AI Chatbot</h2>
      <input className="w-full p-2 rounded bg-gray-700 mb-3"
        placeholder="Ask something about crypto..." value={msg}
        onChange={e => setMsg(e.target.value)} />
      <button className="bg-green-500 px-4 py-2 rounded" onClick={send}>Send</button>
      <pre className="text-sm mt-4">{reply}</pre>
    </div>
  );
}