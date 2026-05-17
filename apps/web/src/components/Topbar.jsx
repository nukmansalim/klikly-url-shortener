import React, { useState } from "react";
import { useApp } from "../context/AppContext.jsx";

const titles = {
  overview: { subtitle: "Dashboard", title: "URL Shortener", desc: "Kelola tautan pendek, QR Code, dan performa campaign Klikly." },
  shortlinks: { subtitle: "Short Links", title: "Tautan Pendek", desc: "Buat dan kelola semua tautan pendek kamu di satu tempat." },
  qrcode: { subtitle: "QR Code", title: "Kode QR", desc: "Generate dan download QR Code untuk setiap tautan." },
  linkinbio: { subtitle: "Link-in-Bio", title: "Link in Bio", desc: "Atur halaman bio dengan semua link penting kamu." },
  campaign: { subtitle: "Campaign", title: "Campaign", desc: "Kelola dan pantau performa campaign marketing kamu." },
};

const dummyNotifications = [
  {
    id: 1,
    icon: "fa-link",
    color: "#478b8d",
    title: "Link baru dibuat",
    desc: "klik.ly/promo-link berhasil dibuat",
    time: "2 menit lalu",
    unread: true,
  },
  {
    id: 2,
    icon: "fa-chart-line",
    color: "#e4d329",
    title: "Milestone tercapai!",
    desc: "Total klik melewati 2.000 bulan ini",
    time: "1 jam lalu",
    unread: true,
  },
  {
    id: 3,
    icon: "fa-qrcode",
    color: "#0d0b61",
    title: "QR Code di-scan",
    desc: "QR klik.ly/ramadanPromo discan 45x hari ini",
    time: "3 jam lalu",
    unread: false,
  },
  {
    id: 4,
    icon: "fa-bullhorn",
    color: "#294669",
    title: "Campaign selesai",
    desc: "Campaign 'Promo Akhir Tahun' berakhir",
    time: "Kemarin",
    unread: false,
  },
  {
    id: 5,
    icon: "fa-user-astronaut",
    color: "#478b8d",
    title: "Bio page diupdate",
    desc: "Link-in-Bio 'Maxbert' berhasil diperbarui",
    time: "2 hari lalu",
    unread: false,
  },
];

const languages = [
  { code: "id", label: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
];

export default function Topbar({ activeTab, setMobileMenuOpen }) {
  const { darkMode, toggleDarkMode, lang, setLang, setPage } = useApp();
  const t = titles[activeTab] || titles.overview;
  const [notifOpen, setNotifOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notifs, setNotifs] = useState(dummyNotifications);

  const unreadCount = notifs.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const closeAll = () => {
    setNotifOpen(false);
    setSettingsOpen(false);
  };

  return (
    <header className="topbar">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.22em]" style={{ color: "var(--accent)" }}>{t.subtitle}</p>
        <h2 className="heading-font heading-dashboard text-4xl font-bold mt-1" style={{ color: "var(--primary)" }}>{t.title}</h2>
        <p className="mt-1" style={{ color: "var(--muted)" }}>{t.desc}</p>
      </div>

      <div className="flex items-center gap-3 topbar-actions">
        {/* Mobile Menu Toggle */}
        {setMobileMenuOpen && (
          <button 
            className="icon-btn mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(true)}
            title="Open Menu"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        )}

        <label className="search-box">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Cari link, campaign, atau QR..." />
        </label>

        {/* Dark Mode Toggle */}
        <button
          className="icon-btn"
          onClick={() => { toggleDarkMode(); closeAll(); }}
          title={darkMode ? "Light Mode" : "Dark Mode"}
        >
          <i className={darkMode ? "fa-solid fa-sun" : "fa-solid fa-moon"}></i>
        </button>

        {/* Notification Bell */}
        <div style={{ position: "relative" }}>
          <button className="icon-btn" onClick={() => { setNotifOpen((v) => !v); setSettingsOpen(false); }}>
            <i className="fa-regular fa-bell"></i>
            {unreadCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-2px",
                  right: "-2px",
                  width: "18px",
                  height: "18px",
                  borderRadius: "999px",
                  background: "#ef4444",
                  color: "white",
                  fontSize: "10px",
                  fontWeight: "800",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <>
              <div style={{ position: "fixed", inset: 0, zIndex: 40 }} onClick={() => setNotifOpen(false)} />
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 12px)",
                  right: 0,
                  width: "360px",
                  maxHeight: "480px",
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: "20px",
                  boxShadow: "0 24px 60px rgba(13,11,97,.18)",
                  zIndex: 50,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    padding: "18px 20px",
                    borderBottom: "1px solid var(--line)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h4 className="font-extrabold" style={{ color: "var(--primary)" }}>Notifikasi</h4>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      style={{
                        fontSize: "12px",
                        fontWeight: "700",
                        color: "var(--accent)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Tandai dibaca
                    </button>
                  )}
                </div>

                <div style={{ overflowY: "auto", flex: 1 }}>
                  {notifs.length === 0 ? (
                    <div style={{ padding: "40px", textAlign: "center", color: "var(--muted)" }}>
                      <i className="fa-regular fa-bell-slash text-2xl mb-2"></i>
                      <p className="text-sm">Tidak ada notifikasi</p>
                    </div>
                  ) : (
                    notifs.map((n) => (
                      <div
                        key={n.id}
                        style={{
                          padding: "14px 20px",
                          borderBottom: "1px solid var(--line)",
                          display: "flex",
                          gap: "14px",
                          alignItems: "flex-start",
                          cursor: "pointer",
                          transition: "background .15s",
                          background: n.unread ? "rgba(71,139,141,.04)" : "transparent",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(71,139,141,.08)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = n.unread ? "rgba(71,139,141,.04)" : "transparent")}
                      >
                        <div
                          style={{
                            width: "38px",
                            height: "38px",
                            borderRadius: "14px",
                            background: `${n.color}18`,
                            color: n.color,
                            display: "grid",
                            placeItems: "center",
                            fontSize: "14px",
                            flexShrink: 0,
                          }}
                        >
                          <i className={`fa-solid ${n.icon}`}></i>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <p className="font-bold text-sm truncate" style={{ color: "var(--primary)" }}>{n.title}</p>
                            {n.unread && (
                              <span
                                style={{
                                  width: "8px",
                                  height: "8px",
                                  borderRadius: "999px",
                                  background: "var(--accent)",
                                  flexShrink: 0,
                                }}
                              />
                            )}
                          </div>
                          <p className="text-xs mt-1" style={{ color: "var(--muted)", lineHeight: 1.4 }}>{n.desc}</p>
                          <p className="text-xs mt-1" style={{ color: "var(--accent)", fontWeight: 600 }}>{n.time}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div style={{ padding: "12px 20px", borderTop: "1px solid var(--line)", textAlign: "center" }}>
                  <button
                    style={{
                      fontSize: "13px",
                      fontWeight: "700",
                      color: "var(--primary)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Lihat semua notifikasi
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Settings / Language */}
        <div style={{ position: "relative" }}>
          <button className="icon-btn" onClick={() => { setSettingsOpen((v) => !v); setNotifOpen(false); }}>
            <i className="fa-solid fa-sliders"></i>
          </button>

          {settingsOpen && (
            <>
              <div style={{ position: "fixed", inset: 0, zIndex: 40 }} onClick={() => setSettingsOpen(false)} />
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 12px)",
                  right: 0,
                  width: "280px",
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: "20px",
                  boxShadow: "0 24px 60px rgba(13,11,97,.18)",
                  zIndex: 50,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "18px 20px",
                    borderBottom: "1px solid var(--line)",
                  }}
                >
                  <h4 className="font-extrabold" style={{ color: "var(--primary)" }}>Pengaturan</h4>
                  <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>Pilih bahasa tampilan</p>
                </div>

                <div>
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setSettingsOpen(false); }}
                      style={{
                        width: "100%",
                        padding: "14px 20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        background: lang === l.code ? "rgba(71,139,141,.08)" : "transparent",
                        border: "none",
                        borderBottom: "1px solid var(--line)",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "background .15s",
                      }}
                      onMouseEnter={(e) => {
                        if (lang !== l.code) e.currentTarget.style.background = "rgba(71,139,141,.04)";
                      }}
                      onMouseLeave={(e) => {
                        if (lang !== l.code) e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <span style={{ fontSize: "20px" }}>{l.flag}</span>
                      <span className="font-bold text-sm" style={{ color: "var(--primary)", flex: 1 }}>
                        {l.label}
                      </span>
                      {lang === l.code && (
                        <i className="fa-solid fa-check" style={{ color: "var(--accent)", fontSize: "14px" }}></i>
                      )}
                    </button>
                  ))}
                </div>

                {/* Switch to Landing */}
                <div style={{ padding: "14px 20px", borderTop: "1px solid var(--line)" }}>
                  <button
                    onClick={() => { setPage("landing"); setSettingsOpen(false); }}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "14px",
                      background: "rgba(71,139,141,.08)",
                      border: "1px solid rgba(71,139,141,.18)",
                      color: "var(--accent)",
                      fontWeight: "700",
                      fontSize: "13px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                    Kembali ke Landing Page
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
