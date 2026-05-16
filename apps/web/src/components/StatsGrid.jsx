import React from "react";

const stats = [
  { icon: "fa-computer-mouse", label: "Total Klik", value: "2.280", note: "+34% bulan lalu" },
  { icon: "fa-link", label: "Link Aktif", value: "128", note: "12 campaign" },
  { icon: "fa-qrcode", label: "QR Scan", value: "746", note: "Event & offline" },
  { icon: "fa-chart-line", label: "CTR Rata-rata", value: "18.7%", note: "Funnel membaik" },
];

export default function StatsGrid() {
  return (
    <div className="stats-grid">
      {stats.map((s, idx) => (
        <div key={idx} className="stat-card">
          <div className="stat-icon"><i className={`fa-solid ${s.icon}`}></i></div>
          <p className="stat-label">{s.label}</p>
          <h3 className="stat-value">{s.value}</h3>
          <p className="stat-note">{s.note}</p>
        </div>
      ))}
    </div>
  );
}