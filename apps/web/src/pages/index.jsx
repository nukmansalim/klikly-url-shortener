// src/pages/index.jsx
import React, { useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import Tabs from "../components/Tabs";
import TestimonialMarquee from "../components/TestimonialMarquee";
import { useNavigate } from "react-router-dom";
const languages = [
  { code: "id", label: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState(0);
  const { darkMode, toggleDarkMode, lang, setLang, setPage } = useApp();
  const [settingsOpen, setSettingsOpen] = useState(false);
let navigate = useNavigate();
  return (
    <div className="bg-zinc-50 text-gray-900">
      {/* Navbar */}
      <nav className="bg-white/92 backdrop-blur-lg border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 relative flex items-center justify-between">
          {/* Logo kiri */}
          <div className="flex items-center gap-3">
            <div className="brand-logo w-10 h-10 rounded-3xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              K
            </div>
            <span className="heading-font font-bold text-3xl tracking-tighter section-title">
              Klikly
            </span>
          </div>

          {/* Menu tengah */}
          <div className="nav-menu hidden md:flex items-center gap-11 text-[16px] font-semibold tracking-tight absolute left-1/2 -translate-x-1/2">
            {["Beranda", "Produk", "Harga", "Resources"].map((label) => (
              <a key={label} href="#" className="nav-link relative transition">
                {label}
              </a>
            ))}
          </div>

          {/* Tombol kanan */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              title={darkMode ? "Light Mode" : "Dark Mode"}
              className="icon-btn"
            >
              <i className={darkMode ? "fa-solid fa-sun" : "fa-solid fa-moon"}></i>
            </button>

            {/* Language Settings */}
            <div style={{ position: "relative" }}>
              <button
                className="icon-btn"
                onClick={() => setSettingsOpen((v) => !v)}
                title="Language"
              >
                <i className="fa-solid fa-globe"></i>
              </button>

              {settingsOpen && (
                <>
                  <div
                    style={{ position: "fixed", inset: 0, zIndex: 40 }}
                    onClick={() => setSettingsOpen(false)}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 12px)",
                      right: 0,
                      width: "240px",
                      background: "white",
                      border: "1px solid var(--line)",
                      borderRadius: "20px",
                      boxShadow: "0 24px 60px rgba(13,11,97,.18)",
                      zIndex: 50,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        padding: "14px 18px",
                        borderBottom: "1px solid var(--line)",
                      }}
                    >
                      <h4 className="font-extrabold text-sm" style={{ color: "var(--primary)" }}>
                        Bahasa
                      </h4>
                    </div>
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setSettingsOpen(false); }}
                        style={{
                          width: "100%",
                          padding: "12px 18px",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          background: lang === l.code ? "rgba(71,139,141,.08)" : "transparent",
                          border: "none",
                          borderBottom: "1px solid var(--line)",
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                      >
                        <span style={{ fontSize: "18px" }}>{l.flag}</span>
                        <span className="font-bold text-sm" style={{ color: "var(--primary)", flex: 1 }}>
                          {l.label}
                        </span>
                        {lang === l.code && (
                          <i className="fa-solid fa-check" style={{ color: "var(--accent)", fontSize: "12px" }}></i>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
              <button
                // onClick={() => setPage("dashboard")}
                onClick={() => navigate("/login")}
                className="btn-primary px-7 py-3 text-white text-base font-semibold rounded-3xl"
              >
                Daftar Gratis
              </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-bg pt-24 pb-28 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h1 className="hero-title heading-font text-7xl md:text-8xl font-bold leading-none tracking-tighter mb-6">
            Jadikan setiap<br />
            koneksi <span className="highlight-text">berarti</span>
          </h1>

          <div className="flex justify-center mb-12">
            <p className="text-xl md:text-2xl max-w-3xl text-white/90 text-center leading-relaxed">
              Buat link pendek, QR Code, dan Link-in-Bio yang indah.
              Semua dalam satu platform yang powerful dan mudah digunakan.
            </p>
          </div>

          {/* Tabs */}
          <div className="hero-tabs w-full flex justify-center mb-10">
            <div className="flex gap-4">
              {[
                { label: "Link Pendek", icon: "🔗" },
                { label: "QR Code", icon: "📱" },
                { label: "Link-in-Bio", icon: "🌐" },
              ].map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`tab-btn px-6 py-4 min-w-[140px] rounded-3xl font-semibold flex items-center justify-center gap-2 ${activeTab === idx ? "active shadow-xl" : ""
                    }`}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          {/* Tab Content */}
          <div className={`tab-content ${activeTab === 0 ? "active" : ""}`}>
            <div className="max-w-3xl mx-auto glass rounded-3xl p-2 shadow-2xl">
              <div className="bg-white rounded-3xl p-10 text-center">
                <label className="block text-sm font-semibold section-subtitle mb-3">
                  Tempel URL panjangmu di sini
                </label>
                <input
                  type="text"
                  className="input-custom w-full px-6 py-6 text-lg rounded-2xl transition"
                  placeholder="https://contoh-link-sangat-panjang.com/artikel-anda"
                />
                <button className="mt-6 w-full btn-primary text-white font-semibold py-6 rounded-3xl text-lg">
                  Buat Link Pendek Sekarang
                </button>
              </div>
            </div>
          </div>

          <div className={`tab-content ${activeTab === 1 ? "active" : ""}`}>
            <div className="max-w-3xl mx-auto glass rounded-3xl p-2 shadow-2xl">
              <div className="bg-white rounded-3xl p-10 text-center">
                <span className="text-7xl mb-6 block">📱</span>
                <h3 className="text-3xl font-bold mb-4 section-title">Generate QR Code</h3>
                <input
                  type="text"
                  className="input-custom w-full px-6 py-6 text-lg rounded-2xl mb-6 transition"
                  placeholder="Masukkan URL atau teks"
                />
                <button className="w-full btn-primary text-white font-semibold py-6 rounded-3xl text-lg">
                  Buat QR Code
                </button>
              </div>
            </div>
          </div>

          <div className={`tab-content ${activeTab === 2 ? "active" : ""}`}>
            <div className="max-w-5xl mx-auto glass rounded-3xl p-2 shadow-2xl">
              <div className="bg-white rounded-3xl p-6 md:p-10">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                  {/* Kiri: Penjelasan */}
                  <div className="text-left">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-highlight text-sm font-semibold mb-5">
                      ✨ Link-in-Bio Profesional
                    </span>

                    <h3 className="text-3xl md:text-4xl font-bold section-title leading-tight mb-4">
                      Satu halaman elegan untuk semua link pentingmu
                    </h3>

                    <p className="section-subtitle text-lg leading-relaxed mb-6">
                      Tampilkan semua akun, promosi, dan kontenmu dalam satu halaman
                      yang modern, bersih, dan meyakinkan.
                    </p>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-2xl bio-link-icon-primary flex items-center justify-center shrink-0 text-lg">
                          🎨
                        </div>
                        <div>
                          <p className="font-semibold section-title">Tampilan Premium</p>
                          <p className="text-sm text-slate-500">Desain bersih dengan branding yang lebih profesional.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-2xl bio-link-icon-accent flex items-center justify-center shrink-0 text-lg">
                          🔗
                        </div>
                        <div>
                          <p className="font-semibold section-title">Semua Link dalam Satu Tempat</p>
                          <p className="text-sm text-slate-500">Website, Instagram, YouTube, toko, dan lainnya.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-2xl bio-link-icon-highlight flex items-center justify-center shrink-0 text-lg">
                          📈
                        </div>
                        <div>
                          <p className="font-semibold section-title">Siap untuk Konversi</p>
                          <p className="text-sm text-slate-500">Cocok untuk kreator, UMKM, personal brand, dan campaign.</p>
                        </div>
                      </div>
                    </div>

                    <button className="btn-primary text-white px-8 py-4 rounded-2xl font-semibold shadow-lg">
                      Coba Template Link-in-Bio
                    </button>
                  </div>

                  {/* Kanan: Preview Card */}
                  <div className="w-full max-w-sm mx-auto">
                    <div className="relative rounded-[2rem] border border-slate-100 bg-gradient-to-b from-white to-slate-50 p-4 shadow-[0_25px_70px_-20px_rgba(13,11,97,0.35)] overflow-hidden">
                      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl" style={{ background: "rgba(228, 211, 41, 0.24)" }}></div>
                      <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full blur-3xl" style={{ background: "rgba(71, 139, 141, 0.24)" }}></div>
                      <div className="relative">
                        <div className="bio-preview-cover h-24 rounded-[1.5rem]"></div>
                        <div className="-mt-12 flex flex-col items-center text-center px-4">
                          <div className="bio-preview-avatar w-24 h-24 rounded-[1.7rem] border-4 border-white flex items-center justify-center text-white text-4xl shadow-lg">
                            👤
                          </div>
                          <h4 className="mt-4 text-xl font-bold section-title">@namakamu</h4>
                          <p className="text-sm text-slate-500 mt-1 max-w-xs">
                            Kreator digital • berbagi konten, karya, dan project terbaik setiap hari.
                          </p>
                          <div className="grid grid-cols-3 gap-3 w-full mt-6 mb-6">
                            <div className="rounded-2xl bg-white/90 border border-slate-100 py-3 shadow-sm">
                              <p className="text-lg font-bold section-title">12K</p>
                              <p className="text-xs text-slate-500">Followers</p>
                            </div>
                            <div className="rounded-2xl bg-white/90 border border-slate-100 py-3 shadow-sm">
                              <p className="text-lg font-bold section-title">48</p>
                              <p className="text-xs text-slate-500">Konten</p>
                            </div>
                            <div className="rounded-2xl bg-white/90 border border-slate-100 py-3 shadow-sm">
                              <p className="text-lg font-bold section-title">4.9</p>
                              <p className="text-xs text-slate-500">Rating</p>
                            </div>
                          </div>

                          <div className="w-full space-y-3">
                            <button className="w-full flex items-center justify-between px-5 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:-translate-y-1 hover:shadow-md transition">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bio-link-icon-primary flex items-center justify-center">
                                  🌐
                                </div>
                                <div className="text-left">
                                  <p className="font-semibold section-title">Website</p>
                                  <p className="text-xs text-slate-500">Kunjungi situs resmi</p>
                                </div>
                              </div>
                              <span className="text-slate-400 text-sm">›</span>
                            </button>

                            <button className="w-full flex items-center justify-between px-5 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:-translate-y-1 hover:shadow-md transition">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bio-link-icon-accent flex items-center justify-center">
                                  📷
                                </div>
                                <div className="text-left">
                                  <p className="font-semibold section-title">Instagram</p>
                                  <p className="text-xs text-slate-500">Konten harian & update</p>
                                </div>
                              </div>
                              <span className="text-slate-400 text-sm">›</span>
                            </button>

                            <button className="w-full flex items-center justify-between px-5 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:-translate-y-1 hover:shadow-md transition">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bio-link-icon-highlight flex items-center justify-center">
                                  ▶️
                                </div>
                                <div className="text-left">
                                  <p className="font-semibold section-title">YouTube</p>
                                  <p className="text-xs text-slate-500">Video terbaru & tutorial</p>
                                </div>
                              </div>
                              <span className="text-slate-400 text-sm">›</span>
                            </button>

                            <button className="w-full flex items-center justify-between px-5 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:-translate-y-1 hover:shadow-md transition">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bio-link-icon-accent flex items-center justify-center">
                                  🛍️
                                </div>
                                <div className="text-left">
                                  <p className="font-semibold section-title">Toko Online</p>
                                  <p className="text-xs text-slate-500">Lihat produk & promo</p>
                                </div>
                              </div>
                              <span className="text-slate-400 text-sm">›</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features & Analytics */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            {/* Kiri: Konten */}
            <div>
              <h3 className="text-3xl font-bold mb-4 section-title">Monitoring Kampanye & Analitik</h3>
              <p className="section-subtitle text-lg leading-relaxed">
                Pantau performa setiap link yang kamu bagikan secara real-time.
                Dari jumlah klik, lokasi pengunjung, perangkat yang digunakan, hingga waktu puncak traffic —
                semua data penting tersaji dalam dashboard yang intuitif.
                Dengan insight yang akurat, kamu bisa mengoptimalkan strategi marketing,
                meningkatkan konversi, dan membuat keputusan bisnis yang lebih cerdas setiap harinya.
              </p>

              <button
                onClick={() => alert("Demo - Mulai gratis clicked")}
                className="mt-8 btn-primary text-white px-10 py-5 rounded-3xl font-semibold text-lg"
              >
                Mulai Gratis
              </button>
            </div>

            {/* Kanan: Analytics Card */}
            <div className="soft-card rounded-3xl p-10 card-hover">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-sm text-slate-500">Total klik bulan ini</p>
                  <p className="text-6xl font-bold section-title">2.280</p>
                </div>
                <div className="font-semibold text-xl flex items-center gap-1" style={{ color: "var(--accent)" }}>
                  ↑ 34%
                </div>
              </div>

              <div className="h-80 soft-gradient rounded-3xl p-8 flex items-end gap-4">
                <div className="bar w-10 rounded-t" style={{ "--height": "65%" }}></div>
                <div className="bar w-10 rounded-t" style={{ "--height": "82%" }}></div>
                <div className="bar w-10 rounded-t" style={{ "--height": "48%" }}></div>
                <div className="bar w-10 rounded-t" style={{ "--height": "95%" }}></div>
                <div className="bar w-10 rounded-t" style={{ "--height": "75%" }}></div>
                <div className="bar w-10 rounded-t" style={{ "--height": "88%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-zinc-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <h2 className="text-5xl font-bold text-center section-title">
            Ratusan pengguna sudah mempercayai kami
          </h2>
        </div>
        <TestimonialMarquee />
      </section>
    </div>
  );
}
