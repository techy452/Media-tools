import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const API_BASE_URL = "http://localhost:8000"; // Set to deployed backend URL before publishing.

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [busy, setBusy] = useState(false);

  async function inspectUrl(e) {
    e.preventDefault();
    setBusy(true);
    setResult("");
    try {
      const response = await fetch(`${API_BASE_URL}/inspect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Request failed");
      setResult(data.message);
    } catch (err) {
      setResult(`कनेक्शन नहीं हुआ: ${err.message}. API_BASE_URL में deployed backend URL सेट करें।`);
    } finally {
      setBusy(false);
    }
  }

  return <main className="page">
    <header><div className="logo">MT</div><span className="brand">Media Tools</span><span className="tag">BETA</span></header>
    <section className="hero">
      <p className="eyebrow">SIMPLE • FAST • MOBILE FRIENDLY</p>
      <h1>अपना मीडिया लिंक यहाँ डालें</h1>
      <p className="sub">अधिकृत मीडिया के लिए सुरक्षित टूल्स का शुरुआती संस्करण।</p>
      <form onSubmit={inspectUrl}>
        <label htmlFor="url">वीडियो या मीडिया URL</label>
        <div className="inputrow"><input id="url" type="url" required placeholder="https://example.com/my-video" value={url} onChange={e => setUrl(e.target.value)} /><button disabled={busy}>{busy ? "जाँच रहे हैं…" : "जाँचें"}</button></div>
      </form>
      {result && <div className="result" role="status">{result}</div>}
      <div className="notice">यह शुरुआती संस्करण अभी वीडियो डाउनलोड नहीं करता। आगे केवल अधिकृत और नियमों के अनुरूप स्रोत जोड़े जाएँगे।</div>
    </section>
    <section className="features">
      <article><b>01</b><h2>URL जाँच</h2><p>लिंक के फॉर्मेट की बुनियादी जाँच।</p></article>
      <article><b>02</b><h2>मोबाइल UI</h2><p>फोन और बड़ी स्क्रीन के लिए responsive layout।</p></article>
      <article><b>03</b><h2>आगे विस्तार</h2><p>अधिकृत मीडिया कन्वर्जन और queue को बाद में जोड़ा जा सकता है।</p></article>
    </section>
    <footer>© Media Tools · कृपया केवल वही मीडिया प्रोसेस करें जिसके लिए आपके पास अधिकार या अनुमति हो।</footer>
  </main>;
}

createRoot(document.getElementById("root")).render(<App />);
