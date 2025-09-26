import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../utils/api";

type Doc = {
  id: number;
  name: string;
  type: string;
  status: "Procesado" | "Procesando" | "Error";
  date: string;
  tables: number;
};

type Props = {
  // opcional: pasar documentos desde fuera
  documents?: Doc[];
};

export default function DocumentsTable({ documents: initialDocs }: Props) {
  const [documents, setDocuments] = useState<Doc[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialDocs && initialDocs.length) {
      setDocuments(initialDocs);
      setLoading(false);
      return;
    }
    async function fetchDocuments() {
      try {
        const data = await apiFetch<Doc[]>("/documents/"); // GET /documents/
        setDocuments(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchDocuments();
  }, [initialDocs]);

  const types = useMemo(
    () => Array.from(new Set(documents.map((d) => d.type))),
    [documents]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return documents.filter((d) => {
      const matchesQ = !q || d.name.toLowerCase().includes(q);
      const matchesType = !typeFilter || d.type === typeFilter;
      const matchesStatus = !statusFilter || d.status === statusFilter;
      return matchesQ && matchesType && matchesStatus;
    });
  }, [documents, search, typeFilter, statusFilter]);

  // DELETE real
  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar documento? Esta acción no se puede deshacer.")) return;

    try {
      await apiFetch(`/documents/${id}`, { method: "DELETE" }); // DELETE /documents/:id
      setDocuments((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      alert(`Error eliminando documento: ${(err as Error).message}`);
    }
  };

  const handleViewTables = (docId: number) => {
    // en tu app real podrías navegar a /tables?documentId=...
    console.log("Ver tablas documento:", docId);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center text-slate-500">
        Cargando documentos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center text-red-600">
        Error al cargar documentos: {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <h3 className="text-lg font-semibold">Mis Documentos</h3>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center bg-slate-100 rounded-md px-2 py-1">
            <span className="text-slate-500 mr-2">🔍</span>
            <input
              type="text"
              placeholder="Buscar mis documentos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm"
            aria-label="Filtrar por tipo"
          >
            <option value="">Todos los tipos</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm"
            aria-label="Filtrar por estado"
          >
            <option value="">Todos los estados</option>
            <option value="Procesado">Procesado</option>
            <option value="Procesando">Procesando</option>
            <option value="Error">Error</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left">
              <th className="p-3">Nombre</th>
              <th className="p-3">Tipo</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Fecha de Subida</th>
              <th className="p-3">Tablas</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-slate-500">
                  No se encontraron documentos.
                </td>
              </tr>
            ) : (
              filtered.map((doc) => (
                <tr key={doc.id} className="border-b last:border-b-0 hover:bg-slate-50">
                  <td className="p-3">{doc.name}</td>
                  <td className="p-3">{doc.type}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        doc.status === "Procesado"
                          ? "bg-green-100 text-green-700"
                          : doc.status === "Procesando"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </td>
                  <td className="p-3">{doc.date}</td>
                  <td className="p-3">{doc.tables}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleViewTables(doc.id)}
                      className="text-sm px-3 py-1 rounded-md bg-slate-100 hover:bg-slate-200"
                    >
                      Ver tablas
                    </button>
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="text-sm px-3 py-1 rounded-md bg-red-50 text-red-600 hover:bg-red-100"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}