import React, { useState } from "react";

export default function Tabs() {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="hero-tabs flex justify-center gap-3 mb-10">
        {["Link Pendek", "QR Code", "Link-in-Bio"].map((label, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className={`tab-btn px-8 py-4 rounded-3xl font-semibold flex items-center gap-3 ${active === idx ? "active" : ""}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className={`tab-content ${active === 0 ? "active" : ""}`}>
        {/* Static placeholder content */}
        <p>Form Link Pendek akan muncul di sini</p>
      </div>
      <div className={`tab-content ${active === 1 ? "active" : ""}`}>
        {/* Static placeholder content */}
        <p>Form QR Code akan muncul di sini</p>
      </div>
      <div className={`tab-content ${active === 2 ? "active" : ""}`}>
        {/* Static placeholder content */}
        <p>Link-in-Bio preview akan muncul di sini</p>
      </div>
    </div>
  );
}