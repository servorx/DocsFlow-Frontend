// src/layouts/Register.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RoleSelector from "../components/RoleSelector";
import logo from "../assets/logo.jpg";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"operator" | "admin">("operator");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Correo inválido");
      return;
    }

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // 👉 Aquí en el futuro se hará POST a tu API (FastAPI o backend)
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/operator"); // ruta para usuario normal
      }
    }, 1200);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-slate-50">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <img
            src={logo}
            alt="DocsFlow"
            className="w-44 h-44 mx-auto rounded-md"
          />
          <h1 className="text-2xl font-bold text-blue-600">Registro</h1>
          <p className="text-slate-500">Crea tu cuenta en DocsFlow</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

          <div>
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
              className="mt-1 w-full p-3 border border-slate-300 rounded-md shadow-sm text-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>

          <div>
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
              className="mt-1 w-full p-3 border border-slate-300 rounded-md shadow-sm text-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-slate-900"
            >
              Confirmar contraseña
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 w-full p-3 border border-slate-300 rounded-md shadow-sm text-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
          <RoleSelector role={role} setRole={setRole} />
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 rounded-md px-4 py-3 font-medium shadow transition focus:outline-none focus:ring 
              ${
                loading
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400"
              }`}
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Crear cuenta"
            )}
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
