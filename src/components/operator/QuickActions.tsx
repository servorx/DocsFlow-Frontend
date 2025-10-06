// src/components/dashboard/QuickActions.tsx
import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Acciones Rápidas</h3>
      <div className="flex flex-col gap-3">
        <button
          onClick={() => navigate("/upload")}
          className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-left"
        >
          📤 Subir Documento
        </button>
        <button
          onClick={() => navigate("/documents")}
          className="w-full px-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-md transition text-left"
        >
          📄 Ver Mis Documentos
        </button>
        <button
          onClick={() => navigate("/tables")}
          className="w-full px-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-md transition text-left"
        >
          📋 Buscar Tablas
        </button>
      </div>
    </div>
  );
}
