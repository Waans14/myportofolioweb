// src/routes/AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../admin/Dashboard";
import Sertifikasi from "../admin/Sertifikasi";
import NotFound from "../pages/NotFound";
import Login from "../auth/Login";
import PrivateRoute from "../utils/PrivateRoute";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Admin dashboard with protection */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/sertifikasi"
          element={
            <PrivateRoute>
              <Sertifikasi />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
