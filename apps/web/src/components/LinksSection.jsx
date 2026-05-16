import React, { useState } from "react";

const initialLinks = [
  {
    slug: "klik.ly/invoiceLandingPage",
    url: "https://dribbble.com/shots/19953119-Invozo-Invoice-Landing-Page",
    date: "12 Des 2025",
    clicks: "820 klik",
  },
  {
    slug: "klik.ly/financeHero",
    url: "https://dribbble.com/shots/19719600-Justadmin-Finance-SaaS-Hero",
    date: "02 Des 2025",
    clicks: "541 klik",
  },
  {
    slug: "klik.ly/ramadanPromo",
    url: "https://klikly.id/campaign/promo-ramadan-umkm",
    date: "28 Nov 2025",
    clicks: "1.204 klik",
  },
];

export default function LinksSection() {
  const [links] = useState(initialLinks);

  return (
    <div className="card p-6 md:p-8">
      <div className="section-head">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.16em]" style={{ color: "var(--primary)" }}>Recent Links</p>
          <h3 className="heading-font text-3xl font-bold mt-1">Tautan Terbaru</h3>
        </div>
        <button className="px-5 py-3 rounded-2xl font-bold btn-primary">
          Lihat Semua
        </button>
      </div>

      <div className="space-y-4" id="linkList">
        {links.map((link, i) => (
          <div key={i} className="link-row">
            <div className="min-w-0">
              <p className="font-extrabold truncate" style={{ color: "var(--primary)" }}>{link.slug}</p>
              <p className="text-sm truncate mt-1" style={{ color: "var(--muted)" }}>{link.url}</p>
              <div className="flex flex-wrap gap-3 mt-3 text-xs font-bold" style={{ color: "var(--muted)" }}>
                <span><i className="fa-regular fa-calendar mr-1"></i> {link.date}</span>
                <span><i className="fa-solid fa-computer-mouse mr-1"></i> {link.clicks}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="icon-btn"><i className="fa-regular fa-copy"></i></button>
              <button className="icon-btn"><i className="fa-solid fa-paper-plane"></i></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
