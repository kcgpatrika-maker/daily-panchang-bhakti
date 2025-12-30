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

  return (
    <div className="ask-news-container">
      <h2>🙏 Ask Bhakti</h2>

      <input
        type="text"
        placeholder="देवी / देवता का नाम लिखें..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={askBhakti} disabled={loading}>
        {loading ? "लोड हो रहा है..." : "पूछें"}
      </button>

      {result && (
        <div className="ask-result">

          <h3>{result.deity}</h3>

          {/* मंत्र */}
          {result.data.mantra && (
            <section>
              <h4>🕉️ मंत्र</h4>
              {renderText(result.data.mantra)}
            </section>
          )}

          {/* आरती */}
          {result.data.aarti && (
            <section>
              <h4>🪔 आरती</h4>
              {renderText(result.data.aarti)}
            </section>
          )}

          {/* पूजा विधि */}
          {result.data.puja_vidhi && (
            <section>
              <h4>🪷 पूजा विधि</h4>
              {renderText(result.data.puja_vidhi)}
            </section>
          )}

          {/* चालीसा / स्तोत्र */}
          {result.data.chalisa_or_stotra && (
            <section>
              <h4>📜 चालीसा / स्तोत्र</h4>
              {renderText(result.data.chalisa_or_stotra)}
            </section>
          )}

        </div>
      )}
    </div>
  );
}
