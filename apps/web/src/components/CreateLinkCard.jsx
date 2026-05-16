import React, { useState } from "react";

const suggestions = ["mail-campaign", "promo-link", "bio-update"];

export default function CreateLinkCard() {
  const [url, setUrl] = useState("https://dribbble.com/Mailtumator");

  const handleCreate = () => {
    if (!url.trim()) {
      alert("Masukkan URL terlebih dahulu.");
      return;
    }
    const slug = url
      .replace(/^https?:\/\//, "")
      .replace(/www\./, "")
      .split(/[\/?#]/)[0]
      .replace(/[^a-zA-Z0-9]/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 18)
      .toLowerCase() || "link-baru";
    alert(`✅ Link berhasil dibuat!\n\nhttps://klik.ly/${slug}`);
  };

  return (
    <div className="card p-6 md:p-7" id="createLinkCard">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.16em]" style={{ color: "var(--accent)" }}>Create</p>
          <h3 className="heading-font text-3xl font-bold mt-1" style={{ color: "var(--primary)" }}>Buat Link Baru</h3>
        </div>
        <div className="w-12 h-12 rounded-2xl grid place-items-center" style={{ background: "rgba(228,211,41,.22)", color: "var(--primary)" }}>
          <i className="fa-solid fa-wand-magic-sparkles"></i>
        </div>
      </div>

      <p className="mb-5" style={{ color: "var(--muted)" }}>Masukkan URL panjang lalu ubah menjadi tautan pendek yang siap dibagikan.</p>

      <div className="input-row">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
        />
        <button onClick={handleCreate} className="btn-primary px-5 py-3 rounded-2xl font-bold whitespace-nowrap">
          Buat
          <i className="fa-solid fa-arrow-right ml-2"></i>
        </button>
      </div>

      <div className="mt-5 rounded-2xl p-4" style={{ background: "rgba(71,139,141,.08)", border: "1px solid rgba(71,139,141,.18)" }}>
        <p className="text-sm font-bold" style={{ color: "var(--secondary)" }}>Saran slug</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {suggestions.map((s, i) => (
            <span key={i} className="px-3 py-2 rounded-xl text-sm font-bold" style={{ background: "white", color: "var(--primary)" }}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
