import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import api, { API_BASE_URL } from "../../services/api.js";

export default function QRCodeTab() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLinkId, setSelectedLinkId] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getLinks();
      if (response.success && Array.isArray(response.data)) {
        setLinks(response.data);
      } else {
        setError("Format respons tidak valid");
      }
    } catch (err) {
      console.error("Gagal memuat link untuk QR:", err);
      setError(err.message || "Gagal memuat data link");
    } finally {
      setLoading(false);
    }
  };

  const selectedLink = links.find(l => l.id === selectedLinkId);
  const qrValue = selectedLink ? `${API_BASE_URL}/${selectedLink.shortCode}` : "";

  const handleDownload = () => {
    const canvas = document.getElementById("qr-canvas");
    if (!canvas) return;
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `klikly-${selectedLink?.shortCode || 'qrcode'}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleCopy = () => {
    const canvas = document.getElementById("qr-canvas");
    if (!canvas) return;
    canvas.toBlob((blob) => {
      const item = new ClipboardItem({ "image/png": blob });
      navigator.clipboard.write([item]).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(err => {
        alert("Failed to copy image to clipboard.");
        console.error(err);
      });
    });
  };

  return (
    <div className="card p-8 min-h-[450px]">
      <div className="flex flex-col md:flex-row gap-12 h-full">
        {/* Left: Input Selection */}
        <div className="flex-1 space-y-6">
          <div>
            <h2 className="heading-font text-2xl font-bold text-(--primary) mb-2">QR Code Generator</h2>
            <p className="text-(--muted)">Select an existing short link to instantly generate a QR code for it.</p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex justify-between items-center">
              <span>{error}</span>
              <button onClick={fetchLinks} className="underline hover:text-red-400 font-bold">Retry</button>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-(--secondary) mb-2">
              Select a Short Link
            </label>
            <div className="relative">
              <select
                value={selectedLinkId}
                onChange={(e) => setSelectedLinkId(e.target.value)}
                disabled={loading}
                className="w-full pl-4 pr-10 py-3 rounded-xl bg-(--bg) border border-(--line) focus:outline-none focus:border-(--accent) focus:ring-1 focus:ring-(--accent) text-(--primary) appearance-none transition-all cursor-pointer disabled:opacity-50"
              >
                <option value="" disabled>
                  {loading ? "-- Loading your links... --" : "-- Select your link --"}
                </option>
                {links.map(link => (
                  <option key={link.id} value={link.id}>
                    {link.title || link.shortCode} (klikly.id/{link.shortCode})
                  </option>
                ))}
              </select>
              <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-(--muted) pointer-events-none"></i>
            </div>
          </div>

          {selectedLink && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl animate-fade-in">
              <p className="text-sm font-medium text-green-700 flex items-center gap-2">
                <i className="fa-solid fa-circle-check"></i>
                Link selected successfully
              </p>
            </div>
          )}
        </div>

        {/* Right: Preview */}
        <div className="flex-1 flex flex-col items-center justify-center border-l-0 md:border-l border-(--line) pt-8 md:pt-0 md:pl-12">
          {qrValue ? (
            <div className="flex flex-col items-center animate-fade-in">
              <div className="p-6 bg-white border border-(--line) rounded-2xl shadow-sm mb-6">
                <QRCodeCanvas
                  id="qr-canvas"
                  value={qrValue}
                  size={200}
                  level="M"
                  includeMargin={false}
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  className="px-5 py-2.5 rounded-xl font-bold btn-accent shadow-lg shadow-yellow-500/20 flex items-center gap-2 whitespace-nowrap"
                >
                  <i className="fa-solid fa-download"></i>
                  Download
                </button>
                <button
                  onClick={handleCopy}
                  className="px-5 py-2.5 rounded-xl font-medium bg-(--bg) border border-(--line) text-(--secondary) hover:text-(--accent) hover:border-(--accent) transition-all flex items-center gap-2"
                >
                  {copied ? <i className="fa-solid fa-check text-green-500"></i> : <i className="fa-regular fa-copy"></i>}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-(--muted)">
              <div className="w-48 h-48 mx-auto border-2 border-dashed border-(--line) rounded-2xl flex items-center justify-center mb-6 bg-(--bg)">
                <i className="fa-solid fa-qrcode text-5xl opacity-20"></i>
              </div>
              <p>Select a link to preview QR Code</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
