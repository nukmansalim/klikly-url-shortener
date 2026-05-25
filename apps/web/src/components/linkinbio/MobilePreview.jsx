import React from "react";

export default function MobilePreview({ profile, links, theme }) {
  // Theme styles based on selection
  const isDark = theme === 'dark';
  
  const bgClass = isDark ? 'bg-gray-900' : 'bg-[#F4F8FA]';
  const textPrimaryClass = isDark ? 'text-white' : 'text-[#0d0b61]';
  const textSecondaryClass = isDark ? 'text-gray-400' : 'text-gray-600';
  const cardClass = isDark ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' : 'bg-white border-gray-200 text-[#0d0b61] hover:bg-gray-50';
  
  const activeLinks = links.filter(link => link.isActive);

  return (
    <div className="sticky top-6 flex justify-center w-full">
      {/* Phone Frame */}
      <div className="relative w-[320px] h-[650px] bg-black rounded-[40px] border-[10px] border-black shadow-2xl overflow-hidden flex flex-col">
        
        {/* Phone Notch */}
        <div className="absolute top-0 inset-x-0 h-6 bg-black rounded-b-2xl w-32 mx-auto z-20"></div>
 
        {/* Screen Content */}
        <div className={`flex-1 overflow-y-auto ${bgClass} transition-colors duration-300 relative scrollbar-hide`}>
          
          {/* Background Decoration (only for light theme) */}
          {!isDark && (
            <div className="absolute inset-0 pointer-events-none opacity-50" style={{
              background: 'radial-gradient(circle at top left, rgba(228, 211, 41, 0.3), transparent 40%), radial-gradient(circle at top right, rgba(71, 139, 141, 0.3), transparent 40%)'
            }}></div>
          )}

          <div className="px-6 py-12 relative z-10 flex flex-col min-h-full">
            
            {/* Profile Section */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-(--accent) to-(--primary) mb-4 p-1 shadow-lg">
                <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center text-2xl font-bold text-(--primary)">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    profile.displayName ? profile.displayName.charAt(0).toUpperCase() : <i className="fa-solid fa-user"></i>
                  )}
                </div>
              </div>
              <h1 className={`text-xl font-bold ${textPrimaryClass} mb-1 heading-font`}>
                {profile.displayName || "@username"}
              </h1>
              <p className={`text-sm ${textSecondaryClass}`}>
                {profile.bio || "Welcome to my Link-in-Bio page!"}
              </p>
            </div>

            {/* Links Section */}
            <div className="space-y-4 flex-1">
              {activeLinks.map(link => (
                <a 
                  key={link.id} 
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`block w-full p-4 rounded-xl border text-center font-medium transition-all shadow-sm ${cardClass}`}
                  style={{ wordBreak: 'break-word' }}
                >
                  {link.title || "Untitled Link"}
                </a>
              ))}
              
              {activeLinks.length === 0 && (
                <div className="text-center p-4 border border-dashed border-gray-300 rounded-xl text-gray-400 text-sm">
                  Links will appear here
                </div>
              )}
            </div>

            {/* Branding/Footer */}
            <div className="mt-10 pt-6 text-center">
              <a href="#" className={`text-xs font-bold ${textSecondaryClass} hover:opacity-80 transition-opacity`}>
                Powered by Klikly
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative hide scrollbar style just for the iframe content */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
