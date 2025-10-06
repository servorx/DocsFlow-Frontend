// src/components/documents/UploadForm.tsx
import { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);

    setTimeout(() => {
      alert("Documento subido correctamente 🚀");
      setFile(null);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold mb-2">Subir Nuevo Documento</h3>
      <p className="text-slate-500 text-sm mb-4">
        Solo se permiten archivos PDF (máx. 10MB)
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="block w-full border border-slate-300 rounded-md p-2"
        />

        {file && (
          <div className="bg-slate-100 p-3 rounded-md text-sm flex justify-between items-center">
            <span>{file.name}</span>
            <button
              type="button"
              className="text-red-600 hover:underline"
              onClick={() => setFile(null)}
            >
              Quitar
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !file}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Subiendo..." : "Subir Documento"}
        </button>
      </form>
    </div>
  );
}
