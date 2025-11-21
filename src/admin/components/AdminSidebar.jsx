import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { LayoutDashboard, Award, LogOut, User } from "lucide-react";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-[#1e293b] border-r border-white/10 text-white flex flex-col">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Admin Panel
        </h2>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
              : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`
          }
        >
          <LayoutDashboard size={20} />
          <span className="font-medium">Projects</span>
        </NavLink>

        <NavLink
          to="/admin/sertifikasi"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
              : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`
          }
        >
          <Award size={20} />
          <span className="font-medium">Sertifikasi</span>
        </NavLink>
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-4 py-3 mb-2 text-slate-400">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
            A
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-white truncate">Admin</p>
            <p className="text-xs text-slate-500 truncate">admin@afone.com</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors"
        >
          <LogOut size={18} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}