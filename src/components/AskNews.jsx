import { useState } from "react";

export default function AskNews() {
  const [deity, setDeity] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState("");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const askBhakti = async () => {
    const q = deity.trim();
    if (!q) return;
    setLoading(true);
    setResult(null);
    setActiveButton("");
    try {
      const res = await fetch(`${BACKEND_URL}/api/ask-bhakti?deity=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
      setResult(null);
    }
    setLoading(false);
  };

  const resetAll = () => {
    setDeity("");
    setResult(null);
    setActiveButton("");
  };

  const isAvailable = (type) => Boolean(result?.available?.[type]);

  const renderText = (value) => {
    if (!value) return null;
    if (Array.isArray(value)) return value.map((v, i) => <p key={i}>{v}</p>);
    if (typeof value === "string") return value.split("\n").map((v, i) => <p key={i}>{v}</p>);
    return <p>{String(value)}</p>;
  };

  return (
    <div className="ask-news-container p-4">
      <h2>🙏 Ask Bhakti</h2>

      <input
        type="text"
        placeholder="देवी / देवता / त्योहार का नाम लिखें..."
        value={deity}
        onChange={(e) => setDeity(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />

      <div className="flex space-x-2 mb-2">
        <button
          onClick={askBhakti}
          disabled={loading}
          className="p-2 rounded bg-blue-500 text-white"
        >
          {loading ? "लोड हो रहा है..." : "पूछें"}
        </button>
        <button onClick={resetAll} className="p-2 rounded bg-gray-200">
          रीसेट
        </button>
      </div>

      {/* Buttons */}
      <div className="flex space-x-2 mb-4">
        <button
          className={`p-2 rounded ${isAvailable("mantra") ? "bg-green-500 text-white" : "bg-gray-300"}`}
          onClick={() => isAvailable("mantra") && setActiveButton("mantra")}
        >
          🕉️ मंत्र
        </button>
        <button
          className={`p-2 rounded ${isAvailable("aarti") ? "bg-green-500 text-white" : "bg-gray-300"}`}
          onClick={() => isAvailable("aarti") && setActiveButton("aarti")}
        >
          🪔 आरती
        </button>
        <button
          className={`p-2 rounded ${isAvailable("poojaVidhi") ? "bg-green-500 text-white" : "bg-gray-300"}`}
          onClick={() => isAvailable("poojaVidhi") && setActiveButton("poojaVidhi")}
        >
          🪷 पूजा विधि
        </button>
        <button
          className={`p-2 rounded ${isAvailable("stotra") ? "bg-green-500 text-white" : "bg-gray-300"}`}
          onClick={() => isAvailable("stotra") && setActiveButton("stotra")}
        >
          📜 स्तोत्र
        </button>
        <button
          className={`p-2 rounded ${isAvailable("chalisa") ? "bg-green-500 text-white" : "bg-gray-300"}`}
          onClick={() => isAvailable("chalisa") && setActiveButton("chalisa")}
        >
          📜 चालीसा
        </button>
      </div>

      {/* Content display */}
      {activeButton && result && (
  <div className="mt-4">
    {activeButton === "aarti" ? (
      Array.isArray(result.content?.aarti) ? (
        result.content.aarti.map((item, idx) => (
          <div key={idx} className="mb-4">
            {item.title && <h3 className="font-semibold">{item.title}</h3>}
            {Array.isArray(item.aarti) &&
              item.aarti.map((line, i) => <p key={i}>{line}</p>)}
          </div>
        ))
      ) : (
        <p>आरती उपलब्ध नहीं है</p>
      )
    ) : (
      renderText(result.content?.[activeButton])
    )}
  </div>
)}

