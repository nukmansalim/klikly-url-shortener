import React, { useState, useEffect } from "react";
import LinkItem from "./LinkItem";
import CreateLinkModal from "./CreateLinkModal";
import api from "../../services/api";

export default function ShortLinksTab() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch links from backend
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
      console.error("Gagal memuat link:", err);
      setError(err.message || "Gagal memuat data dari server");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      try {
        await api.deleteLink(id);
        setLinks(links.filter(link => link.id !== id));
      } catch (err) {
        alert(err.message || "Gagal menghapus link");
      }
    }
  };

  const handleToggleStatus = async (id) => {
    const linkToToggle = links.find(l => l.id === id);
    if (!linkToToggle) return;

    try {
      const updatedStatus = !linkToToggle.isActive;
      const response = await api.updateLink(id, { isActive: updatedStatus });
      if (response.success && response.data) {
        setLinks(links.map(link => 
          link.id === id ? response.data : link
        ));
      } else {
        setLinks(links.map(link => 
          link.id === id ? { ...link, isActive: updatedStatus } : link
        ));
      }
    } catch (err) {
      alert(err.message || "Gagal memperbarui status link");
    }
  };

  const handleCreate = async (data) => {
    try {
      const response = await api.createLink({
        originalUrl: data.originalUrl,
        title: data.title || undefined
      });
      if (response.success && response.data) {
        setLinks([response.data, ...links]);
      } else {
        fetchLinks();
      }
    } catch (err) {
      alert(err.message || "Gagal membuat link pendek");
    }
  };

  const filteredLinks = links.filter(link => {
    const query = searchQuery.toLowerCase();
    const titleMatch = link.title && link.title.toLowerCase().includes(query);
    const urlMatch = link.originalUrl.toLowerCase().includes(query);
    const shortMatch = link.shortCode.toLowerCase().includes(query);
    return titleMatch || urlMatch || shortMatch;
  });

  return (
    <div className="space-y-6 min-w-0">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative flex-1 max-w-md w-full">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-(--muted)"></i>
          <input 
            type="text" 
            placeholder="Search links..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-(--bg) border border-(--line) focus:outline-none focus:border-(--accent) focus:ring-1 focus:ring-(--accent) text-(--primary) transition-all shadow-sm"
          />
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl font-bold btn-accent shadow-lg shadow-yellow-500/20 flex items-center gap-2 whitespace-nowrap"
        >
          <i className="fa-solid fa-plus"></i>
          Create New
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex justify-between items-center animate-fade-in">
          <span>{error}</span>
          <button onClick={fetchLinks} className="underline hover:text-red-400 font-bold">Retry</button>
        </div>
      )}

      {/* List Container */}
      <div className="space-y-4">
        {loading ? (
          <div className="card p-12 flex flex-col items-center justify-center text-center">
            <i className="fa-solid fa-circle-notch fa-spin text-3xl text-(--accent) mb-3"></i>
            <p className="text-(--muted) text-sm">Loading your links...</p>
          </div>
        ) : filteredLinks.length > 0 ? (
          filteredLinks.map(link => (
            <LinkItem 
              key={link.id} 
              link={link} 
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
            />
          ))
        ) : (
          <div className="card p-12 flex flex-col items-center justify-center text-center border-dashed">
            <div className="w-16 h-16 rounded-full bg-(--line) flex items-center justify-center mb-4 text-(--muted) text-2xl">
              <i className="fa-solid fa-link-slash"></i>
            </div>
            <h3 className="text-lg font-bold text-(--primary) mb-1">No links found</h3>
            <p className="text-(--muted) max-w-sm">
              {searchQuery ? "We couldn't find any links matching your search." : "You haven't created any short links yet. Click the button above to get started."}
            </p>
          </div>
        )}
      </div>

      <CreateLinkModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCreate={handleCreate} 
      />
    </div>
  );
}
