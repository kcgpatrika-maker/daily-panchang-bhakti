import { useState } from "react";
import axios from "axios";

export default function AskNews() {
  const [deity, setDeity] = useState("");
  const [available, setAvailable] = useState({});
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDeityChange = async (e) => {
    const name = e.target.value;
    setDeity(name);
    setError("");
    setAvailable({});
    setContent([]);

    if (!name) return;

    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/api/ask-bhakti?deity=${encodeURIComponent(
          name
        )}`
      );
      setAvailable(res.data.available || {});
      setContent(res.data.content?.mantra || []);
    } catch (err) {
      setError("देवता नहीं मिला या सर्वर error");
      setAvailable({});
      setContent([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ask-bhakti p-4">
      {/* Devta input */}
      <input
        type="text"
        placeholder="देवता का नाम डालें"
        value={deity}
        onChange={handleDeityChange}
        className="border p-2 rounded w-full mb-2"
      />

      {/* Buttons */}
      <button
        className={`p-2 rounded mr-2 ${
          available && available.mantra ? "bg-green-500 text-white" : "bg-gray-300"
        }`}
      >
        मंत्र
      </button>
      <button className="p-2 rounded mr-2 bg-gray-300">आरती</button>
      <button className="p-2 rounded mr-2 bg-gray-300">पूजा विधि</button>
      <button className="p-2 rounded mr-2 bg-gray-300">स्तोत्र</button>
      <button className="p-2 rounded mr-2 bg-gray-300">चालीसा</button>

      {/* Loading / Error */}
      {loading && <p className="mt-2">Loading…</p>}
      {error && <p className="mt-2 text-red-500">{error}</p>}

      {/* मंत्र display */}
      {available.mantra && content.length > 0 && (
        <ul className="mt-4 list-disc ml-6">
          {content.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
