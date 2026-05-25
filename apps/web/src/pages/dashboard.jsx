import React, { useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatsGrid from "../components/StatsGrid";
import ChartSection from "../components/ChartSection";
import ShortLinksTab from "../components/shortlinks/ShortLinksTab";
import QRCodeTab from "../components/qrcode/QRCodeTab";
import LinkInBioTab from "../components/linkinbio/LinkInBioTab";

const tabContent = {
  overview: (
    <div className="space-y-7 min-w-0">
      <StatsGrid />
      <ChartSection />
    </div>
  ),
  shortlinks: <ShortLinksTab />,
  qrcode: <QRCodeTab />,
  linkinbio: <LinkInBioTab />,
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <main className="main-area">
        <Topbar activeTab={activeTab} setMobileMenuOpen={setMobileMenuOpen} />
        <section className="content" style={{ gridTemplateColumns: "minmax(0, 1fr)" }}>
          {tabContent[activeTab]}
        </section>
      </main>
    </div>
  );
}
