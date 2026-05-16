// src/App.jsx
import React from "react";
import "./App.css";
import { useApp } from "./context/AppContext.jsx";
import Dashboard from "./pages/dashboard";
import Landing from "./pages/index";

function App() {
  const { page, darkMode } = useApp();

  return (
    <div className={darkMode ? "dark" : ""} style={{ minHeight: "100vh" }}>
      {page === "dashboard" ? <Dashboard /> : <Landing />}
    </div>
  );
}

export default App;
