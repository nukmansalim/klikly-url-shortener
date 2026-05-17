import React, { useState } from "react";

export default function CreateLinkModal({ isOpen, onClose, onCreate }) {
  const [originalUrl, setOriginalUrl] = useState("");
  const [title, setTitle] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!originalUrl) return;
    
    // Pass data back
    onCreate({ originalUrl, title });
    
    // Reset and close
    setOriginalUrl("");
    setTitle("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="card w-full max-w-lg p-6 animate-fade-in shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="heading-font text-xl font-bold text-[color:var(--primary)]">Create New Short Link</h2>
          <button 
            onClick={onClose}
            className="text-[color:var(--muted)] hover:text-[color:var(--primary)] transition-colors"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[color:var(--secondary)] mb-1">
              Destination URL <span className="text-red-500">*</span>
            </label>
            <input 
              type="url" 
              required
              placeholder="https://example.com/very/long/url..."
              className="w-full px-4 py-2 rounded-lg bg-[color:var(--bg)] border border-[color:var(--line)] focus:outline-none focus:border-[color:var(--accent)] focus:ring-1 focus:ring-[color:var(--accent)] text-[color:var(--primary)] transition-all"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[color:var(--secondary)] mb-1">
              Title (Optional)
            </label>
            <input 
              type="text" 
              placeholder="e.g. Promo Campaign August"
              className="w-full px-4 py-2 rounded-lg bg-[color:var(--bg)] border border-[color:var(--line)] focus:outline-none focus:border-[color:var(--accent)] focus:ring-1 focus:ring-[color:var(--accent)] text-[color:var(--primary)] transition-all"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className="text-xs text-[color:var(--muted)] mt-1">
              Add a title to easily identify this link later.
            </p>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-[color:var(--line)]">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg font-medium text-[color:var(--secondary)] hover:bg-[color:var(--line)] transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 rounded-lg font-medium bg-[color:var(--accent)] text-white hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-blue-500/20"
            >
              <i className="fa-solid fa-link"></i>
              Shorten URL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
