import React, { useState } from "react";
import axios from "axios";
import {api, API_BASE_URL} from "../services/api.js";
import { useNavigate } from "react-router-dom";
// Hint: Anda akan perlu mengimpor sesuatu dari "react-router-dom" di sini

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  

  // Nanti Anda akan menginisialisasi hook router di sini

  const handleLoginClick = async (e) => {
        e.preventDefault(); 
        // Mencegah browser melakukan refresh halaman bawaan
        try {
            const response = await api.login(email, password);
            console.log("Login successful:", response.data);
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed:", error);
        }
    console.log("Email:", email);
    console.log("Password:", password);
    
    // Nanti logika pengecekan API atau penyimpanan token ada di sini
    
    // Hint: Logika routing perpindahan halaman akan diletakkan di sini
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Halaman Login</h2>
      <form>
        <div>
          <label>Email:</label>
          <br />
          <input
          style={{backgroundColor:"red", color:"white"}}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label>Password:</label>
          <br />
          <input
                    style={{backgroundColor:"red", color:"white"}}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <button onClick={handleLoginClick} type="submit">
          Masuk
        </button>
      </form>
    </div>
  );
}

export default Login;