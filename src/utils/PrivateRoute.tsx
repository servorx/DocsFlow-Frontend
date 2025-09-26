// src/utils/PrivateRoute.tsx
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, role }: { children: JSX.Element, role?: string }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  const expiresAt = localStorage.getItem("expires_at");

  if (!token || !expiresAt || Date.now() > Number(expiresAt)) {
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
