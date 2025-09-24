// src/pages/ForgotPassword.tsx
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.includes("@")) {
      setError("Por favor ingresa un correo válido.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(
        "Se han enviado las instrucciones a tu correo electrónico."
      );
      setEmail("");
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-slate-50">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <img
            src="/assets/logo.jpg"
            alt="DocsFlow"
            className="w-16 h-16 rounded-md mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-blue-600">
            Recuperar Contraseña
          </h1>
          <p className="text-slate-500">
            Ingresa tu correo para recibir instrucciones
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <p className="text-red-600 text-sm font-medium">{error}</p>
          )}
          {success && (
            <p className="text-green-600 text-sm font-medium">{success}</p>
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
              className="w-full p-3 border border-slate-300 rounded-md text-sm shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-3 text-white font-medium shadow hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring focus:ring-blue-400"
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Enviar Instrucciones"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            Volver al inicio de sesión
          </a>
        </div>
      </div>
    </div>
  );
}
