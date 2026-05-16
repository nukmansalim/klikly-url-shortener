import React from "react";
import { useApp } from "../context/AppContext.jsx";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatsGrid from "../components/StatsGrid";
import ChartSection from "../components/ChartSection";

const tabContent = {
  overview: (
    <div className="space-y-7 min-w-0">
      <StatsGrid />
      <ChartSection />
    </div>
  ),
  shortlinks: (
    <div className="card p-8" style={{ minHeight: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", color: "var(--muted)" }}>
        <i className="fa-solid fa-link text-4xl mb-4" style={{ color: "var(--line)" }}></i>
        <h3 className="heading-font text-2xl font-bold" style={{ color: "var(--primary)" }}>Short Links</h3>
        <p className="mt-2">Halaman Short Links akan segera hadir.</p>
      </div>
    </div>
  ),
  qrcode: (
    <div className="card p-8" style={{ minHeight: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", color: "var(--muted)" }}>
        <i className="fa-solid fa-qrcode text-4xl mb-4" style={{ color: "var(--line)" }}></i>
        <h3 className="heading-font text-2xl font-bold" style={{ color: "var(--primary)" }}>QR Code</h3>
        <p className="mt-2">Halaman QR Code akan segera hadir.</p>
      </div>
    </div>
  ),
  linkinbio: (
    <div className="card p-8" style={{ minHeight: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", color: "var(--muted)" }}>
        <i className="fa-solid fa-user-astronaut text-4xl mb-4" style={{ color: "var(--line)" }}></i>
        <h3 className="heading-font text-2xl font-bold" style={{ color: "var(--primary)" }}>Link-in-Bio</h3>
        <p className="mt-2">Halaman Link-in-Bio akan segera hadir.</p>
      </div>
    </div>
  ),
  campaign: (
    <div className="card p-8" style={{ minHeight: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", color: "var(--muted)" }}>
        <i className="fa-solid fa-bullhorn text-4xl mb-4" style={{ color: "var(--line)" }}></i>
        <h3 className="heading-font text-2xl font-bold" style={{ color: "var(--primary)" }}>Campaign</h3>
        <p className="mt-2">Halaman Campaign akan segera hadir.</p>
      </div>
    </div>
  ),
};

export default function Dashboard() {
  const { activeTab, setActiveTab } = useApp();

  return (
    <div className="app-shell">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="main-area">
        <Topbar activeTab={activeTab} />
        <section className="content" style={{ gridTemplateColumns: "1fr" }}>
          {tabContent[activeTab]}
        </section>
      </main>
    </div>
  );
}
