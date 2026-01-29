import React, { useState } from "react";

function AskNews({ content = {} }) {
  const [active, setActive] = useState(null);

  const isAvailable = {
    mantra: Array.isArray(content.mantra) && content.mantra.length > 0,
    aarti: Array.isArray(content?.aarti) && content.aarti.length > 0,
    poojaVidhi: Array.isArray(content?.poojaVidhi) && content.poojaVidhi.length > 0,
    chalisa: Array.isArray(content?.chalisa) && content.chalisa.some(i => i.pdf),
    stotra: Array.isArray(content?.stotra) && content.stotra.some(i => i.pdf),
  };

  return (
    <div>
      <div className="buttons">
        <button className={isAvailable.mantra ? "btn green" : "btn"} onClick={() => setActive("mantra")}>मंत्र</button>
        <button className={isAvailable.aarti ? "btn green" : "btn"} onClick={() => setActive("aarti")}>आरती</button>
        <button className={isAvailable.poojaVidhi ? "btn green" : "btn"} onClick={() => setActive("poojaVidhi")}>पूजा विधि</button>
        <button className={isAvailable.chalisa ? "btn green" : "btn"} onClick={() => setActive("chalisa")}>चालीसा</button>
        <button className={isAvailable.stotra ? "btn green" : "btn"} onClick={() => setActive("stotra")}>स्तोत्र</button>
      </div>

      <div className="section">
        {active === "mantra" &&
          Array.isArray(content?.mantra) &&
          content.mantra.map((line, idx) => <p key={idx}>{line}</p>)
        }

        {active === "aarti" &&
          content?.aarti?.map((item, idx) => (
            <div key={idx}>
              {item.title && <h4>{item.title}</h4>}
              {item.aarti?.map((line, i) => <p key={i}>{line}</p>)}
            </div>
          ))
        }

        {active === "poojaVidhi" &&
          content?.poojaVidhi?.map((item, idx) => (
            <div key={idx}>
              {item.text && <p>{item.text}</p>}
              {item.pdf && <a href={item.pdf} target="_blank" rel="noopener noreferrer">📄 {item.source}</a>}
            </div>
          ))
        }

        {active === "chalisa" &&
          content?.chalisa?.map((item, idx) =>
            item.pdf && <div key={idx}><a href={item.pdf} target="_blank">📄 {item.source}</a></div>
          )
        }

        {active === "stotra" &&
          content?.stotra?.map((item, idx) =>
            item.pdf && <div key={idx}><a href={item.pdf} target="_blank">📄 {item.source}</a></div>
          )
        }
      </div>
    </div>
  );
}

export default AskNews;
