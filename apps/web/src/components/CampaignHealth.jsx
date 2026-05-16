import React from "react";

const metrics = [
  { label: "Engagement", value: 82 },
  { label: "Mobile Traffic", value: 69 },
  { label: "Bio Click", value: 74 },
];

export default function CampaignHealth() {
  return (
    <div className="card p-6 md:p-7">
      <div className="section-head mb-5">
        <h3 className="font-extrabold uppercase tracking-[0.12em]" style={{ color: "var(--primary)" }}>Campaign Health</h3>
        <span className="px-3 py-2 rounded-xl text-sm font-bold" style={{ background: "rgba(228,211,41,.24)", color: "var(--primary)" }}>Good</span>
      </div>

      <div className="space-y-5">
        {metrics.map((m, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm font-bold mb-2">
              <span style={{ color: "var(--secondary)" }}>{m.label}</span>
              <span style={{ color: "var(--primary)" }}>{m.value}%</span>
            </div>
            <div className="progress">
              <span style={{ width: `${m.value}%` }}></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
