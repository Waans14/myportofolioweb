// src/admin/components/AdminSidebar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen backdrop-blur-md bg-white/10 border-r border-white/20 text-white p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <nav className="space-y-2">
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `block px-4 py-2 rounded hover:bg-blue-700 ${isActive ? "bg-blue-600" : ""}`
          }
        >
        Projects
        </NavLink>
        <NavLink
          to="/admin/sertifikasi"
          className={({ isActive }) =>
            `block px-4 py-2 rounded hover:bg-blue-700 ${isActive ? "bg-blue-600" : ""}`
          }
        >
          Sertifikasi
        </NavLink>
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 mt-6 bg-red-600 hover:bg-red-700 rounded"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}