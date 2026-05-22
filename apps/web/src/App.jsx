// src/App.jsx
import React from "react";
import "./App.css";
import { useApp } from "./context/AppContext.jsx";
import { Outlet } from "react-router-dom";



function App() {
  const { darkMode } = useApp();

  return (
    <div className={darkMode ? "dark" : ""} style={{ minHeight: "100vh" }}>
      <Outlet/>
    </div>
  );
}

export default App;
