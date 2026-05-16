import React, { useState } from "react";

const months = [
  { label: "Jan", height: "72%", clicks: 290 },
  { label: "Feb", height: "66%", clicks: 266 },
  { label: "Mar", height: "61%", clicks: 246 },
  { label: "Apr", height: "72%", clicks: 290 },
  { label: "Mei", height: "58%", clicks: 234 },
  { label: "Jun", height: "84%", clicks: 338 },
  { label: "Jul", height: "53%", clicks: 213 },
  { label: "Agu", height: "76%", clicks: 306 },
  { label: "Sep", height: "57%", clicks: 230 },
  { label: "Okt", height: "88%", clicks: 354 },
  { label: "Nov", height: "58%", clicks: 234 },
  { label: "Des", height: "79%", clicks: 318 },
];

export default function ChartSection() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="card p-6 md:p-8">
      <div className="section-head">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.16em]" style={{ color: "var(--primary)" }}>Analytics</p>
          <h3 className="heading-font text-3xl font-bold mt-1" style={{ color: "var(--text)" }}>Performa Klik Bulanan</h3>
        </div>

        <div className="flex items-center gap-3 text-sm font-bold">
          <span className="inline-flex items-center gap-2" style={{ color: "var(--primary)" }}>
            <span className="w-3 h-3 rounded-full" style={{ background: "var(--primary)" }}></span>
            Klik
          </span>
          <span className="inline-flex items-center gap-2" style={{ color: "var(--accent)" }}>
            <span className="w-3 h-3 rounded-full" style={{ background: "var(--accent)" }}></span>
            Konversi
          </span>
        </div>
      </div>

      <div className="chart-area">
        {months.map((m, i) => (
          <div
            key={i}
            className="bar-wrap"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: "pointer", position: "relative" }}
          >
            {hovered === i && (
              <div className="chart-tooltip">
                <p className="text-white/70">{m.label} 2025</p>
                <p className="font-bold">Total klik: {m.clicks}</p>
              </div>
            )}
            <div className="bar" style={{ height: m.height }}></div>
            <span className="text-xs" style={{ color: "var(--muted)" }}>{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
