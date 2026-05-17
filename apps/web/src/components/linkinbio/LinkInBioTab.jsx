import React, { useState } from "react";
import LinkEditor from "./LinkEditor";
import MobilePreview from "./MobilePreview";

export default function LinkInBioTab() {
  const [profile, setProfile] = useState({
    username: "",
    displayName: "",
    bio: "",
    avatar: ""
  });
  
  const [theme, setTheme] = useState("light");
  
  const [links, setLinks] = useState([
    {
      id: "1",
      title: "My Portfolio",
      url: "https://my-portfolio-website.com",
      isActive: true
    },
    {
      id: "2",
      title: "Follow me on Twitter",
      url: "https://twitter.com/johndoe",
      isActive: true
    }
  ]);

  const handleSave = () => {
    // Simulate save
    const btn = document.getElementById("save-btn");
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
    btn.disabled = true;
    
    setTimeout(() => {
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Saved!';
      btn.classList.add("bg-green-500");
      btn.classList.remove("bg-[color:var(--primary)]");
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.classList.remove("bg-green-500");
        btn.classList.add("bg-[color:var(--primary)]");
        btn.disabled = false;
      }, 2000);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white p-6 rounded-2xl border border-[color:var(--line)] shadow-sm">
        <div>
          <h2 className="heading-font text-2xl font-bold text-[color:var(--primary)] mb-1">Link-in-Bio Setup</h2>
          <p className="text-[color:var(--muted)]">Build your custom landing page to share all your links.</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            className="px-4 py-2.5 rounded-xl font-medium bg-[color:var(--bg)] border border-[color:var(--line)] text-[color:var(--secondary)] hover:text-[color:var(--accent)] hover:border-[color:var(--accent)] transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
            Open Live
          </button>
          <button 
            id="save-btn"
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl font-bold btn-accent shadow-lg shadow-yellow-500/20 flex items-center gap-2 whitespace-nowrap transition-all"
          >
            <i className="fa-regular fa-floppy-disk"></i>
            Save Changes
          </button>
        </div>
      </div>

      {/* Main Content: Split layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left: Editor Panel */}
        <div className="flex-1 lg:max-w-2xl">
          <LinkEditor 
            profile={profile} 
            setProfile={setProfile} 
            links={links} 
            setLinks={setLinks}
            theme={theme}
            setTheme={setTheme}
          />
        </div>

        {/* Right: Live Preview */}
        <div className="hidden lg:block w-[380px] flex-shrink-0 relative">
          <div className="sticky top-6">
            <h3 className="heading-font text-lg font-bold text-[color:var(--primary)] mb-4 text-center">Live Preview</h3>
            <MobilePreview profile={profile} links={links} theme={theme} />
          </div>
        </div>

      </div>
    </div>
  );
}
