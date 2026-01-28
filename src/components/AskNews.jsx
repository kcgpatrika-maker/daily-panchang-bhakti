import React, { useState } from "react";

function AskNews({ content }) {
  const [active, setActive] = useState(null);

  // ✅ Availability check
  const isAvailable = {
    mantra: Array.isArray(content.mantra) && content.mantra.length > 0,
    aarti: Array.isArray(content.aarti) && content.aarti.length > 0,
    poojaVidhi: Array.isArray(content.poojaVidhi) && content.poojaVidhi.length > 1,
    chalisa: Array.isArray(content.chalisa) && content.chalisa.some(item => item.pdf || item.text),
    stotra: Array.isArray(content.stotra) && content.stotra.length > 0,
  };

  return (
    <div>
      {/* Buttons */}
      <div className="buttons">
        <button
          className={isAvailable.mantra ? "btn green" : "btn"}
          onClick={() => setActive("mantra")}
        >
          मंत्र
        </button>
        <button
          className={isAvailable.aarti ? "btn green" : "btn"}
          onClick={() => setActive("aarti")}
        >
          आरती
        </button>
        <button
          className={isAvailable.poojaVidhi ? "btn green" : "btn"}
          onClick={() => setActive("poojaVidhi")}
        >
          पूजा विधि
        </button>
        <button
          className={isAvailable.chalisa ? "btn green" : "btn"}
          onClick={() => setActive("chalisa")}
        >
          चालीसा
        </button>
        <button
          className={isAvailable.stotra ? "btn green" : "btn"}
          onClick={() => setActive("stotra")}
        >
          स्तोत्र
        </button>
      </div>

      {/* Display Sections */}
      <div className="section">
        {active === "mantra" &&
          content.mantra.map((line, idx) => <p key={idx}>{line}</p>)}

        {active === "aarti" &&
          content.aarti.map((item, idx) => (
            <div key={idx}>
              {item.title && <h4>{item.title}</h4>}
              {Array.isArray(item.aarti) &&
                item.aarti.map((line, i) => <p key={i}>{line}</p>)}
            </div>
          ))}

        {active === "poojaVidhi" &&
          content.poojaVidhi.map((item, idx) => (
            <div key={idx}>
              {item.text && <p>{item.text}</p>}
              {item.pdf && (
                <a
                  href={item.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "blue", textDecoration: "underline" }}
                >
                  📄 {item.source || "PDF लिंक"}
                </a>
              )}
            </div>
          ))}

        {/* ✅ Chalisa rendering */}
        {active === "chalisa" &&
          content.chalisa.map((item, idx) => (
            <div key={idx}>
              {item.pdf && (
                <a
                  href={item.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "green", fontWeight: "bold" }}
                >
                  📄 {item.source || "PDF लिंक"}
                </a>
              )}
              {item.text && <p>{item.text}</p>}
            </div>
          ))}

        {active === "stotra" &&
          content.stotra.map((line, idx) => <p key={idx}>{line}</p>)}
      </div>
    </div>
  );
}

export default AskNews;
