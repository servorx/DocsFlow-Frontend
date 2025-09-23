import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
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

    setTimeout(() => {
      setLoading(false);
      if (email === "admin@docsflow.com" && password === "123456") {
        alert("Inicio de sesión exitoso");
      } else {
        setAttempts((prev) => Math.max(prev - 1, 0)); // nunca baja de 0
        setError("Credenciales incorrectas");
      }
    }, 1000);
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

        <div className="mt-6 text-center">
          <a
            href="/forgot"
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            ¿Olvidaste tu contraseña?
          </a>
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
