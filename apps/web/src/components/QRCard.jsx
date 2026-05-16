import React from "react";

const qrPattern = [
  [1,1,0,2,0,1,1],
  [1,0,1,0,1,0,1],
  [0,1,1,0,2,1,0],
  [2,0,0,1,0,0,2],
  [0,1,2,0,1,1,0],
  [1,0,1,2,0,0,1],
  [1,1,0,0,1,1,1],
];

export default function QRCard() {
  return (
    <div className="card p-6 md:p-7">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.16em]" style={{ color: "var(--primary)" }}>QR Code</p>
          <p className="mt-1" style={{ color: "var(--muted)" }}>QR otomatis untuk link aktif.</p>
        </div>
        <button className="btn-accent px-4 py-3 rounded-2xl font-extrabold text-sm">Download</button>
      </div>

      <div className="flex items-center gap-5">
        <div className="qr-box" aria-label="QR Code dekoratif">
          {qrPattern.map((row, ri) =>
            row.map((cell, ci) => (
              <span
                key={`${ri}-${ci}`}
                className={`qr-dot ${cell === 2 ? "alt" : ""}`}
                style={{ visibility: cell === 0 ? "hidden" : "visible" }}
              />
            ))
          )}
        </div>

        <div className="min-w-0">
          <p className="font-extrabold truncate" style={{ color: "var(--primary)" }}>klik.ly/mailtumator</p>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>22 Desember 2025</p>
          <p className="text-sm mt-4 font-bold" style={{ color: "var(--accent)" }}>746 scan</p>
        </div>
      </div>
    </div>
  );
}
