import React from "react";

export default function PreviewCard() {
  return (
    <div className="card p-6 md:p-7">
      <div className="section-head mb-5">
        <h3 className="font-extrabold uppercase tracking-[0.12em]" style={{ color: "var(--primary)" }}>Preview Link</h3>
        <i className="fa-solid fa-link" style={{ color: "var(--accent)" }}></i>
      </div>

      <div className="mini-preview">
        <div className="preview-screen">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          </div>

          <div className="preview-cover">
            <p className="text-xs text-white/70">Klikly Campaign</p>
            <h4 className="font-extrabold text-lg leading-snug">Naikkan performa link brand kamu.</h4>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-3">
            <div className="swatch" style={{ background: "rgba(228,211,41,.34)" }}></div>
            <div className="swatch" style={{ background: "rgba(71,139,141,.24)" }}></div>
            <div className="swatch" style={{ background: "rgba(13,11,97,.14)" }}></div>
          </div>
        </div>

        <div className="mt-4 bg-white rounded-2xl border p-4 flex items-center gap-3" style={{ borderColor: "var(--line)" }}>
          <i className="fa-solid fa-link" style={{ color: "var(--accent)" }}></i>
          <span className="font-bold truncate" style={{ color: "var(--primary)" }}>klik.ly/mailtumator</span>
        </div>
      </div>
    </div>
  );
}
