import type { JSX } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({
  children,
  role,
}: {
  // el children es un componente que se renderizará si la ruta es accesible
  children: JSX.Element;
  role?: string;
}) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  const expiresAt = localStorage.getItem("expires_at");

  // verifica si el token está presente y si está expirado
  const isExpired = !expiresAt || Date.now() > Number(expiresAt);

  // Si no hay token o expiró
  if (!token || isExpired) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("expires_at");
    // el replace evita que el usuario pueda volver a la página protegida con el botón de atrás
    return <Navigate to="/login" replace />;
  }

  // Si se requiere un rol específico y no coincide
  if (role && userRole !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Si todo está bien, renderiza el contenido protegido
  return children;
}