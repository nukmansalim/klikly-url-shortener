import React from "react";

const navItems = [
  { icon: "fa-chart-pie", label: "Overview", tab: "overview" },
  { icon: "fa-link", label: "Short Links", tab: "shortlinks" },
  { icon: "fa-qrcode", label: "QR Code", tab: "qrcode" },
  { icon: "fa-user-astronaut", label: "Link-in-Bio", tab: "linkinbio" },
  { icon: "fa-bullhorn", label: "Campaign", tab: "campaign" },
];

export default function Sidebar({ activeTab, onTabChange, mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <>
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity" 
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
      <aside className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="flex items-center gap-3 mb-10">
        <div className="brand-icon">K</div>
        <div>
          <h1 className="heading-font text-2xl font-bold" style={{ color: "var(--primary)" }}>Klikly</h1>
          <p className="text-sm" style={{ color: "var(--muted)" }}>Link Manager</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item, idx) => (
          <div
            key={idx}
            className={`nav-item ${activeTab === item.tab ? "active" : ""}`}
            onClick={() => {
              onTabChange(item.tab);
              if (setMobileMenuOpen) setMobileMenuOpen(false);
            }}
          >
            <i className={`fa-solid ${item.icon}`}></i>
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      <div className="mt-8 pt-8 border-t" style={{ borderColor: "var(--line)" }}>
        <div className="nav-item">
          <i className="fa-solid fa-gear"></i>
          <span>Pengaturan</span>
        </div>
      </div>

      <div className="mt-auto">
        <div className="card p-4 mb-4" style={{ boxShadow: "none" }}>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl grid place-items-center font-bold" style={{ background: "var(--gradient-accent)", color: "var(--primary)" }}>M</div>
            <div className="min-w-0">
              <p className="font-bold truncate" style={{ color: "var(--primary)" }}>Maxbert</p>
              <p className="text-xs truncate" style={{ color: "var(--muted)" }}>Pro Workspace</p>
            </div>
          </div>
        </div>
        <div className="nav-item">
          <i className="fa-solid fa-right-from-bracket"></i>
          <span>Keluar</span>
        </div>
      </div>
    </aside>
    </>
  );
}
