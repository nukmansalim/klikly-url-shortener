import React, { useState } from "react";
import api, { API_BASE_URL } from "../services/api.js";

const suggestions = ["mail-campaign", "promo-link", "bio-update"];

export default function CreateLinkCard() {
  const [url, setUrl] = useState("https://dribbble.com/Mailtumator");
  const [title, setTitle] = useState("");
  const [customShortCode, setCustomShortCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [createdLink, setCreatedLink] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCreate = async (e) => {
    if (e) e.preventDefault();
    if (!url.trim()) {
      setError("Masukkan URL terlebih dahulu.");
      return;
    }
    
    setLoading(true);
    setError(null);
    setCreatedLink(null);
    setCopied(false);

    try {
      const response = await api.createLink({
        originalUrl: url,
        title: title.trim() || undefined,
        customShortCode: customShortCode.trim() || undefined,
      });

      if (response.success && response.data) {
        setCreatedLink(response.data);
        // Reset input fields
        setUrl("");
        setTitle("");
        setCustomShortCode("");
      } else {
        setError("Gagal membuat shortlink.");
      }
    } catch (err) {
      setError(err.message || "Gagal menghubungi server");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!createdLink) return;
    const shortUrl = `klikly.id/${createdLink.shortCode}`;
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCreatedLink(null);
    setError(null);
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

      {!createdLink ? (
        <form onSubmit={handleCreate} className="space-y-4">
          <p className="mb-5" style={{ color: "var(--muted)" }}>Masukkan URL panjang lalu ubah menjadi tautan pendek yang siap dibagikan.</p>

          <div>
            <label className="block text-sm font-bold mb-1.5" style={{ color: "var(--secondary)" }}>
              Destination URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/very/long/url..."
              className="w-full px-4 py-3 rounded-xl bg-(--bg) border border-(--line) focus:outline-none focus:border-(--accent) focus:ring-1 focus:ring-(--accent) text-(--primary) transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1.5" style={{ color: "var(--secondary)" }}>
                Title (Optional)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Promo Campaign"
                className="w-full px-4 py-3 rounded-xl bg-(--bg) border border-(--line) focus:outline-none focus:border-(--accent) focus:ring-1 focus:ring-(--accent) text-(--primary) transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-1.5" style={{ color: "var(--secondary)" }}>
                Custom Slug (Optional)
              </label>
              <input
                type="text"
                value={customShortCode}
                onChange={(e) => setCustomShortCode(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ""))}
                placeholder="e.g. my-promo"
                className="w-full px-4 py-3 rounded-xl bg-(--bg) border border-(--line) focus:outline-none focus:border-(--accent) focus:ring-1 focus:ring-(--accent) text-(--primary) transition-all"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto btn-primary px-6 py-3.5 rounded-2xl font-bold whitespace-nowrap flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/10"
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin"></i>
                  Memproses...
                </>
              ) : (
                <>
                  Buat
                  <i className="fa-solid fa-arrow-right"></i>
                </>
              )}
            </button>
          </div>

          <div className="mt-5 rounded-2xl p-4" style={{ background: "rgba(71,139,141,.08)", border: "1px solid rgba(71,139,141,.18)" }}>
            <p className="text-sm font-bold" style={{ color: "var(--secondary)" }}>Saran slug</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {suggestions.map((s, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setCustomShortCode(s)}
                  className="px-3 py-2 rounded-xl text-sm font-bold bg-white text-(--primary) hover:border-(--accent) border border-transparent shadow-sm hover:shadow transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </form>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <div className="p-5 rounded-2xl bg-green-500/10 border border-green-500/20 text-center">
            <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto mb-3 text-xl">
              <i className="fa-solid fa-check"></i>
            </div>
            <h4 className="font-bold text-green-700 text-lg mb-1">Tautan Berhasil Dibuat!</h4>
            <p className="text-sm text-green-600">Shortlink Anda sudah aktif dan siap dibagikan.</p>
          </div>

          <div className="p-4 rounded-xl bg-(--bg) border border-(--line) space-y-3">
            <div>
              <p className="text-xs font-bold text-(--muted) uppercase tracking-wider">Short URL</p>
              <div className="flex items-center justify-between gap-3 mt-1">
                <a
                  href={`${API_BASE_URL}/${createdLink.shortCode}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-(--accent) font-bold hover:underline truncate"
                >
                  klikly.id/{createdLink.shortCode}
                </a>
                <button
                  onClick={handleCopy}
                  className="w-10 h-10 rounded-xl bg-white border border-(--line) text-(--secondary) hover:text-(--accent) hover:border-(--accent) flex items-center justify-center shadow-sm shrink-0 transition-all"
                  title="Copy short link"
                >
                  {copied ? <i className="fa-solid fa-check text-green-500"></i> : <i className="fa-regular fa-copy"></i>}
                </button>
              </div>
            </div>

            <div className="border-t border-(--line) pt-3">
              <p className="text-xs font-bold text-(--muted) uppercase tracking-wider">Original URL</p>
              <p className="text-sm text-(--primary) truncate mt-1" title={createdLink.originalUrl}>
                {createdLink.originalUrl}
              </p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="w-full py-3 rounded-xl border border-(--line) text-(--secondary) hover:bg-(--line) font-semibold transition-all"
          >
            Buat Tautan Lain
          </button>
        </div>
      )}
    </div>
  );
}
