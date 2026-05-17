import React, { useState } from "react";
import LinkItem from "./LinkItem";
import CreateLinkModal from "./CreateLinkModal";

const MOCK_LINKS = [
  {
    id: "1",
    shortCode: "promo24",
    originalUrl: "https://www.example.com/very/long/url/for/marketing/campaign/2024",
    title: "Summer Promo 2024",
    clicks: 1245,
    isActive: true,
    createdAt: "2024-08-01T10:00:00Z"
  },
  {
    id: "2",
    shortCode: "x7k9p",
    originalUrl: "https://www.google.com/search?q=url+shortener",
    title: "",
    clicks: 342,
    isActive: true,
    createdAt: "2024-08-15T14:30:00Z"
  },
  {
    id: "3",
    shortCode: "ig-bio",
    originalUrl: "https://my-portfolio-website.com/about-me",
    title: "Instagram Bio Link",
    clicks: 8900,
    isActive: false,
    createdAt: "2024-01-10T08:15:00Z"
  }
];

export default function ShortLinksTab() {
  const [links, setLinks] = useState(MOCK_LINKS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      setLinks(links.filter(link => link.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, isActive: !link.isActive } : link
    ));
  };

  const handleCreate = (data) => {
    const newLink = {
      id: Math.random().toString(36).substr(2, 9),
      shortCode: Math.random().toString(36).substr(2, 6),
      originalUrl: data.originalUrl,
      title: data.title,
      clicks: 0,
      isActive: true,
      createdAt: new Date().toISOString()
    };
    setLinks([newLink, ...links]);
  };

  const filteredLinks = links.filter(link => {
    const query = searchQuery.toLowerCase();
    const titleMatch = link.title && link.title.toLowerCase().includes(query);
    const urlMatch = link.originalUrl.toLowerCase().includes(query);
    const shortMatch = link.shortCode.toLowerCase().includes(query);
    return titleMatch || urlMatch || shortMatch;
  });

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative flex-1 max-w-md w-full">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--muted)]"></i>
          <input 
            type="text" 
            placeholder="Search links..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[color:var(--bg)] border border-[color:var(--line)] focus:outline-none focus:border-[color:var(--accent)] focus:ring-1 focus:ring-[color:var(--accent)] text-[color:var(--primary)] transition-all shadow-sm"
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

      {/* List Container */}
      <div className="space-y-4">
        {filteredLinks.length > 0 ? (
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
            <div className="w-16 h-16 rounded-full bg-[color:var(--line)] flex items-center justify-center mb-4 text-[color:var(--muted)] text-2xl">
              <i className="fa-solid fa-link-slash"></i>
            </div>
            <h3 className="text-lg font-bold text-[color:var(--primary)] mb-1">No links found</h3>
            <p className="text-[color:var(--muted)] max-w-sm">
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
