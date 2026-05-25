import React from "react";

export default function LinkEditor({ profile, setProfile, links, setLinks, theme, setTheme }) {
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const addLink = () => {
    const newLink = {
      id: Math.random().toString(36).substr(2, 9),
      title: "My New Link",
      url: "https://",
      isActive: true
    };
    setLinks([...links, newLink]);
  };

  const updateLink = (id, field, value) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  const removeLink = (id) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const toggleLink = (id) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, isActive: !link.isActive } : link
    ));
  };

  return (
    <div className="space-y-8 pb-10">
      
      {/* Profile Settings */}
      <div className="card p-6 border-(--line)">
        <h3 className="heading-font text-lg font-bold text-(--primary) mb-4 flex items-center gap-2">
          <i className="fa-solid fa-user-astronaut"></i>
          Profile
        </h3>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-(--secondary) mb-1">
                Display Name
              </label>
              <input 
                type="text" 
                name="displayName"
                value={profile.displayName}
                onChange={handleProfileChange}
                placeholder="e.g. John Doe"
                className="w-full px-4 py-2 rounded-lg bg-(--bg) border border-(--line) focus:outline-none focus:border-(--accent) text-(--primary) transition-all"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-(--secondary) mb-1">
                Username (URL)
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2 bg-(--line) text-(--muted) rounded-l-lg border border-(--line) border-r-0 text-sm">klikly.id/</span>
                <input 
                  type="text" 
                  name="username"
                  value={profile.username}
                  onChange={handleProfileChange}
                  placeholder="johndoe"
                  className="w-full px-4 py-2 rounded-r-lg bg-(--bg) border border-(--line) focus:outline-none focus:border-(--accent) text-(--primary) transition-all"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-(--secondary) mb-1">
              Bio
            </label>
            <textarea 
              name="bio"
              value={profile.bio}
              onChange={handleProfileChange}
              placeholder="Tell your audience who you are..."
              rows={2}
              className="w-full px-4 py-2 rounded-lg bg-(--bg) border border-(--line) focus:outline-none focus:border-(--accent) text-(--primary) transition-all resize-none"
            />
          </div>
        </div>
      </div>

      {/* Theme Settings */}
      <div className="card p-6 border-(--line)">
        <h3 className="heading-font text-lg font-bold text-(--primary) mb-4 flex items-center gap-2">
          <i className="fa-solid fa-palette"></i>
          Theme
        </h3>
        <div className="flex gap-4">
          <button 
            onClick={() => setTheme('light')}
            className={`flex-1 py-3 rounded-xl border-2 transition-all font-medium ${theme === 'light' ? 'border-(--primary) text-(--primary) bg-slate-50' : 'border-(--line) text-(--muted) hover:border-(--accent)'}`}
          >
            Light Theme
          </button>
          <button 
            onClick={() => setTheme('dark')}
            className={`flex-1 py-3 rounded-xl border-2 transition-all font-medium ${theme === 'dark' ? 'border-(--primary) text-(--primary) bg-slate-50' : 'border-(--line) text-(--muted) hover:border-(--accent)'}`}
          >
            Dark Theme
          </button>
        </div>
      </div>

      {/* Links Management */}
      <div className="card p-6 border-(--line)">
        <div className="flex items-center justify-between mb-6">
          <h3 className="heading-font text-lg font-bold text-(--primary) flex items-center gap-2">
            <i className="fa-solid fa-link"></i>
            Links
          </h3>
          <button 
            onClick={addLink}
            className="px-4 py-2 rounded-lg font-bold btn-accent text-sm flex items-center gap-2 shadow-sm"
          >
            <i className="fa-solid fa-plus"></i>
            Add Link
          </button>
        </div>

        <div className="space-y-4">
          {links.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-(--line) rounded-xl text-(--muted)">
              You haven't added any links yet.
            </div>
          ) : (
            links.map((link, index) => (
              <div key={link.id} className={`p-4 rounded-xl border-2 transition-all ${link.isActive ? 'border-(--line) bg-(--surface)' : 'border-(--line) bg-(--bg) opacity-70'}`}>
                <div className="flex justify-between items-start gap-4 mb-3">
                  <div className="flex-1">
                    <input 
                      type="text"
                      value={link.title}
                      onChange={(e) => updateLink(link.id, 'title', e.target.value)}
                      placeholder="Title"
                      className="w-full font-bold text-(--primary) bg-transparent border-none focus:outline-none mb-1 px-1"
                    />
                    <input 
                      type="text"
                      value={link.url}
                      onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                      placeholder="URL"
                      className="w-full text-sm text-(--accent) bg-transparent border-none focus:outline-none px-1"
                    />
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => toggleLink(link.id)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${link.isActive ? 'text-green-500 border-green-200 bg-green-50' : 'text-gray-400 border-gray-200 bg-white hover:bg-gray-50'}`}
                      title="Toggle Visibility"
                    >
                      <i className={`fa-solid ${link.isActive ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                    </button>
                    <button 
                      onClick={() => removeLink(link.id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center border border-(--line) text-red-400 hover:text-red-500 hover:bg-red-50 transition-all bg-white"
                      title="Delete"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
