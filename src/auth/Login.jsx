// src/auth/Login.jsx
import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setErrorMsg("Login gagal. Periksa email dan password.");
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-xl px-8 py-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Login Admin</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {errorMsg && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}

          <input
            type="email"
            placeholder="Email"
            className="w-full bg-white/10 placeholder-white/80 text-white border border-white/30 px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-white/10 placeholder-white/80 text-white border border-white/30 px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
