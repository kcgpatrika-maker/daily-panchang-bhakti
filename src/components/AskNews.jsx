import { useState } from "react";

export default function AskNews() {
  const [deity, setDeity] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Track which button is active (clicked)
  const [activeButton, setActiveButton] = useState("");

  const askBhakti = async () => {
    if (!deity.trim()) return;

    setLoading(true);
    setResult(null);
    setActiveButton("");

    try {
      const res = await fetch(
        `${BACKEND_URL}/api/ask-bhakti?deity=${encodeURIComponent(deity)}`
      );
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
      setResult(null);
    }

    setLoading(false);
  };

  const isAvailable = (type) => result?.available?.[type] === true;

  const renderText = (value) => {
    if (!value) return null;
    if (Array.isArray(value)) return <ul>{value.map((v, i) => <li key={i}>{v}</li>)}</ul>;
    if (typeof value === "string") return value.split("\n").map((v, i) => <p key={i}>{v}</p>);
    return <p>{String(value)}</p>;
  };

  return (
    <div className="ask-news-container p-4">
      <h2>🙏 Ask Bhakti</h2>

      <input
        type="text"
        placeholder="देवी / देवता का नाम लिखें..."
        value={deity}
        onChange={(e) => setDeity(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />

      <button
        onClick={askBhakti}
        disabled={loading}
        className="p-2 rounded bg-blue-500 text-white mb-2"
      >
        {loading ? "लोड हो रहा है..." : "पूछें"}
      </button>

      {/* Buttons */}
      <div className="flex space-x-2 mb-4">
        <button
          className={`p-2 rounded ${isAvailable("mantra") ? "bg-green-500 text-white" : "bg-gray-300"}`}
          onClick={() => setActiveButton("mantra")}
        >
          🕉️ मंत्र
        </button>

        <button
          className={`p-2 rounded ${isAvailable("aarti") ? "bg-green-500 text-white" : "bg-gray-300"}`}
          onClick={() => setActiveButton("aarti")}
        >
          🪔 आरती
        </button>

        <button
          className={`p-2 rounded ${isAvailable("poojaVidhi") ? "bg-green-500 text-white" : "bg-gray-300"}`}
          onClick={() => setActiveButton("poojaVidhi")}
        >
          🪷 पूजा विधि
        </button>

        <button
          className={`p-2 rounded ${isAvailable("stotra") ? "bg-green-500 text-white" : "bg-gray-300"}`}
          onClick={() => setActiveButton("stotra")}
        >
          📜 स्तोत्र
        </button>

        <button
          className={`p-2 rounded ${isAvailable("chalisa") ? "bg-green-500 text-white" : "bg-gray-300"}`}
          onClick={() => setActiveButton("chalisa")}
        >
          📜 चालीसा
        </button>
      </div>

            {/* Content display */}
      {activeButton && result && (
        <div className="mt-4">

          {/* मंत्र */}
          {activeButton === "mantra" &&
            Array.isArray(result.content?.mantra) &&
            result.content.mantra.map((line, i) => (
              <p key={i}>{line}</p>
            ))}

          {/* आरती – FINAL */}
          {activeButton === "aarti" &&
            Array.isArray(result.content?.aarti) &&
            result.content.aarti.map((item, idx) => (
              <div key={idx} className="mb-6">
                <h3 className="font-bold mb-2">{item.title}</h3>

                {Array.isArray(item.aarti) &&
                  item.aarti.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
              </div>
            ))}

          {/* पूजा विधि */}
          {activeButton === "poojaVidhi" &&
            typeof result.content?.poojaVidhi === "string" &&
            result.content.poojaVidhi
              .split("\n")
              .filter(Boolean)
              .map((line, i) => <p key={i}>{line}</p>)}

          {/* स्तोत्र */}
          {activeButton === "stotra" &&
            Array.isArray(result.content?.stotra) &&
            result.content.stotra.map((line, i) => (
              <p key={i}>{line}</p>
            ))}

          {/* चालीसा */}
          {activeButton === "chalisa" &&
            typeof result.content?.chalisa === "string" &&
            result.content.chalisa
              .split("\n")
              .filter(Boolean)
              .map((line, i) => <p key={i}>{line}</p>)}

        </div>
      )}
