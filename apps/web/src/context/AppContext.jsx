import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("klikly_darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("klikly_lang");
    return saved || "id";
  });

  const [activeTab, setActiveTab] = useState(() => {
    const saved = localStorage.getItem("klikly_activeTab");
    return saved || "overview";
  });

  const [page, setPage] = useState(() => {
    const saved = localStorage.getItem("klikly_page");
    return saved || "landing";
  });

  useEffect(() => {
    localStorage.setItem("klikly_darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("klikly_lang", lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("klikly_activeTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem("klikly_page", page);
  }, [page]);

  const toggleDarkMode = () => setDarkMode((v) => !v);

  return (
    <AppContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        lang,
        setLang,
        activeTab,
        setActiveTab,
        page,
        setPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
