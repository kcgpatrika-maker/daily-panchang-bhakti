import { useState } from "react";

export default function AskNews() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const askBhakti = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(
        `${BACKEND_URL}/api/ask-bhakti-all?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setResult(data.success ? data : null);
    } catch (e) {
      console.error(e);
      setResult(null);
    }

    setLoading(false);
  };

  const renderText = (value) => {
    if (!value) return <p>डेटा उपलब्ध नहीं</p>;

    if (Array.isArray(value)) {
      return (
        <ul>
          {value.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    }

    if (typeof value === "string") {
      return value.split("\n").map((line, i) => (
        <p key={i}>{line}</p>
      ));
    }

    return <p>{String(value)}</p>;
  };

  const isAvailable = (type) => result?.data?.[type] && result.success;

  return (
    <div className="ask-news-container p-4">
      <h2>🙏 Ask Bhakti</h2>

      <input
        type="text"
        placeholder="देवी / देवता का नाम लिखें..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
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
        >
          🕉️ मंत्र
        </button>
        <button
          className={`p-2 rounded ${isAvailable("aarti") ? "bg-green-500 text-white" : "bg-gray-300"}`}
        >
          🪔 आरती
        </button>
        <button
          className={`p-2 rounded ${isAvailable("puja_vidhi") ? "bg-green-500 text-white" : "bg-gray-300"}`}
        >
          🪷 पूजा विधि
        </button>
        <button
          className={`p-2 rounded ${isAvailable("stotra") ? "bg-green-500 text-white" : "bg-gray-300"}`}
        >
          📜 स्तोत्र
        </button>
        <button
          className={`p-2 rounded ${isAvailable("chalisa") ? "bg-green-500 text-white" : "bg-gray-300"}`}
        >
          📜 चालीसा
        </button>
      </div>

      {/* Result Display */}
      {result && (
        <div className="ask-result space-y-4">
          <h3 className="text-lg font-semibold">{result.deity}</h3>

          {isAvailable("mantra") && (
            <section>
              <h4>🕉️ मंत्र</h4>
              {renderText(result.data.mantra)}
            </section>
          )}
          {isAvailable("aarti") && (
            <section>
              <h4>🪔 आरती</h4>
              {renderText(result.data.aarti)}
            </section>
          )}
          {isAvailable("puja_vidhi") && (
            <section>
              <h4>🪷 पूजा विधि</h4>
              {renderText(result.data.puja_vidhi)}
            </section>
          )}
          {isAvailable("stotra") && (
            <section>
              <h4>📜 स्तोत्र</h4>
              {renderText(result.data.stotra)}
            </section>
          )}
          {isAvailable("chalisa") && (
            <section>
              <h4>📜 चालीसा</h4>
              {renderText(result.data.chalisa)}
            </section>
          )}
        </div>
      )}
    </div>
  );
}
