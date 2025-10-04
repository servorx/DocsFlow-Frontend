import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

function Unauthorized() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-slate-50">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8 text-center">
        <img src={logo} alt="DocsFlow" className="w-16 h-16 rounded-md mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-blue-600 mb-2">Acceso no autorizado</h1>
        <p className="text-slate-600 mb-6">
          No tienes permisos para acceder a esta página o recurso.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white font-medium rounded-md px-6 py-3 hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  )
}

export default Unauthorized