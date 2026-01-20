import { useState } from "react";
import axios from "axios";

export default function AskNews() {
  const [deity, setDeity] = useState("");
  const [available, setAvailable] = useState({});
  const [content, setContent] = useState({});
  
  const handleDeityChange = async (e) => {
    const name = e.target.value;
    setDeity(name);

    if (!name) {
      setAvailable({});
      setContent({});
      return;
    }

    try {
      const res = await axios.get(`/api/ask-bhakti?deity=${encodeURIComponent(name)}`);
      setAvailable(res.data.available || {});
      setContent(res.data.content || {});
    } catch (err) {
      setAvailable({});
      setContent({});
    }
  };

  return (
    <div className="ask-bhakti">
      <input
        type="text"
        placeholder="देवता का नाम डालें"
        value={deity}
        onChange={handleDeityChange}
        className="border p-2 rounded w-full mb-2"
      />

      <button
        className={`p-2 rounded mr-2 ${available.mantra ? "bg-green-500 text-white" : "bg-gray-300"}`}
      >
        मंत्र
      </button>
      <button className="p-2 rounded mr-2 bg-gray-300">आरती</button>
      <button className="p-2 rounded mr-2 bg-gray-300">पूजा विधि</button>
      <button className="p-2 rounded mr-2 bg-gray-300">स्तोत्र</button>
      <button className="p-2 rounded mr-2 bg-gray-300">चालीसा</button>

      {/* मंत्र दिखाएँ */}
      {available.mantra && content.mantra?.length > 0 && (
        <ul className="mt-4 list-disc ml-6">
          {content.mantra.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
