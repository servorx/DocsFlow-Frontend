// src/components/dashboard/RecentDocuments.tsx
type Document = {
  name: string;
  type: string;
  date: string;
  status: "Procesado" | "Procesando" | "Error";
};

type Props = {
  documents?: Document[];
};

export default function RecentDocuments({ documents = [] }: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Documentos Recientes</h3>
      {documents.length === 0 ? (
        <p className="text-slate-500 text-sm text-center">
          No tienes documentos recientes.
        </p>
      ) : (
        <div className="divide-y">
          {documents.map((doc, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 text-sm"
            >
              <div>
                <strong>{doc.name}</strong>
                <div className="text-slate-500">
                  {doc.type} • {doc.date}
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  doc.status === "Procesado"
                    ? "bg-green-100 text-green-600"
                    : doc.status === "Procesando"
                    ? "bg-amber-100 text-amber-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {doc.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
