import React, { useState } from "react";
import { API_BASE_URL } from "../../services/api.js";

export default function LinkItem({ link, onDelete, onToggleStatus }) {
  const [copied, setCopied] = useState(false);
  const shortUrl = `klikly.id/${link.shortCode}`;
  const redirectUrl = `${API_BASE_URL}/${link.shortCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="card p-5 hover:border-(--accent) transition-all group flex flex-col md:flex-row md:items-center justify-between gap-4 border border-(--line)">
      
      {/* Left side: Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <h4 className="font-bold text-(--primary) truncate">
            {link.title || "Untitled Link"}
          </h4>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${link.isActive ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
            {link.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3 min-w-0">
          <a 
            href={redirectUrl}
            target="_blank" 
            rel="noreferrer"
            className="text-(--accent) font-medium text-sm flex items-center gap-1 hover:underline shrink-0"
          >
            {shortUrl}
            <i className="fa-solid fa-arrow-up-right-from-square text-xs opacity-70"></i>
          </a>
          <span className="hidden sm:inline text-(--line) shrink-0">•</span>
          <p className="text-sm text-(--muted) truncate flex-1 min-w-0" title={link.originalUrl}>
            {link.originalUrl}
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs text-(--muted)">
          <span className="flex items-center gap-1.5" title="Total Clicks">
            <i className="fa-solid fa-chart-simple"></i>
            {link.clicks.toLocaleString()} clicks
          </span>
          <span className="flex items-center gap-1.5" title="Created Date">
            <i className="fa-regular fa-calendar"></i>
            {formatDate(link.createdAt)}
          </span>
        </div>
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={handleCopy}
          className="w-9 h-9 rounded-lg flex items-center justify-center bg-(--bg) border border-(--line) text-(--secondary) hover:text-(--accent) hover:border-(--accent) transition-all"
          title="Copy short link"
        >
          {copied ? <i className="fa-solid fa-check text-green-500"></i> : <i className="fa-regular fa-copy"></i>}
        </button>
        
        <button 
          className="w-9 h-9 rounded-lg flex items-center justify-center bg-(--bg) border border-(--line) text-(--secondary) hover:text-(--primary) transition-all"
          title="View Analytics"
        >
          <i className="fa-solid fa-chart-line"></i>
        </button>

        <button 
          onClick={() => onToggleStatus(link.id)}
          className="w-9 h-9 rounded-lg flex items-center justify-center bg-(--bg) border border-(--line) text-(--secondary) hover:text-orange-500 transition-all"
          title={link.isActive ? "Deactivate link" : "Activate link"}
        >
          {link.isActive ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}
        </button>

        <button 
          onClick={() => onDelete(link.id)}
          className="w-9 h-9 rounded-lg flex items-center justify-center bg-(--bg) border border-(--line) text-(--secondary) hover:text-red-500 hover:border-red-500/50 transition-all"
          title="Delete link"
        >
          <i className="fa-regular fa-trash-can"></i>
        </button>
      </div>
    </div>
  );
}
