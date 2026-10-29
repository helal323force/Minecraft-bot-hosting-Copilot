import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./lib/auth";
import { LandingPage } from "./pages/LandingPage";
import { UserDashboard } from "./pages/UserDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import { SetupNoticePage } from "./pages/SetupNoticePage";
import { NotFoundPage } from "./pages/NotFoundPage";

function AppRoutes() {
  const { user, loading, isAdmin, adminSetupRequired } = useAuth();

  if (loading) {
    return <div className="loading-shell">Loading authentication…</div>;
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  if (adminSetupRequired) {
    return (
      <Routes>
        <Route path="/" element={<SetupNoticePage />} />
        <Route path="/setup" element={<SetupNoticePage />} />
        <Route path="*" element={<Navigate to="/setup" replace />} />
      </Routes>
    );
  }

  if (isAdmin && user.email?.toLowerCase() === "wingxmc26@gmail.com") {
    return (
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
