import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(5);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (attempts <= 0) {
      setError("Se ha agotado el número de intentos. Por favor, inténtelo de nuevo más tarde.");
      return;
    }

    if (!email.includes("@")) {
      setError("Correo inválido");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      setLoading(false);

      if (!response.ok) {
        setAttempts((prev) => Math.max(prev - 1, 0));
        throw new Error("Credenciales incorrectas");
      }

      const data = await response.json();

      // Guardar en localStorage
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("expires_at", (Date.now() + data.expires_in * 1000).toString());

      // Redirigir según rol
      if (data.role === "admin") {
        navigate("/admin");
      } else if (data.role === "operator") {
        navigate("/operator");
      } else {
        navigate("/login");
      }

    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-slate-50">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <img
            src={logo}
            alt="DocsFlow"
            className="w-16 h-16 rounded-md mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-blue-600">DocsFlow</h1>
          <p className="text-slate-500">Gestión de documentos operativos</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <p className="text-red-600 text-sm font-medium">{error}</p>
          )}

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-900"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border-3 border-slate-300 rounded-md text-sm shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-900"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border-3 border-slate-300 rounded-md text-sm shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading || attempts <= 0}
            className={`w-full flex items-center justify-center gap-2 rounded-md px-4 py-3 font-medium shadow focus:outline-none focus:ring transition
              ${
                attempts <= 0
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400"
              }`}
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              attempts <= 0 ? "Bloqueado" : "Iniciar Sesión"
            )}
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center justify-center gap-2 rounded-md px-4 py-3 font-medium 
                      bg-white border border-blue-500 text-blue-600 
                      hover:bg-blue-50 hover:border-blue-600 hover:text-blue-700
                      focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 
                      transition"
          >
            Crear cuenta
          </button>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/forgot"
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        {/* Intentos restantes */}
        {attempts < 5 && (
          <div className="mt-4 p-3 bg-amber-100 border border-amber-400 rounded-md text-center">
            <p className="text-amber-600 font-medium">
              Intentos restantes: {attempts}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
