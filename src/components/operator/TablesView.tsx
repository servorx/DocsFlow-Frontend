import { useEffect, useMemo, useState } from "react";

type TableItem = {
  id: number;
  documentId: number;
  documentName: string;
  rows: number;
  preview?: string; // breve preview de la tabla
};

type Props = {
  // opcional: pasar tablas desde fuera
  tables?: TableItem[];
};

export default function TablesView({ tables: initial }: Props) {
  const [tables, setTables] = useState<TableItem[]>([]);
  const [search, setSearch] = useState("");
  const [docFilter, setDocFilter] = useState<number | "">("");

  useEffect(() => {
    if (initial && initial.length) {
      setTables(initial);
      return;
    }

    // MOCK data — reemplaza con tableService.getByDocument o tableService.search
    const sample: TableItem[] = [
      { id: 1, documentId: 1, documentName: "Contrato_Maria_2024.pdf", rows: 12, preview: "Nombre | Fecha | Valor" },
      { id: 2, documentId: 3, documentName: "Reporte_Mensual.pdf", rows: 45, preview: "Producto | Cantidad | Precio" },
      { id: 3, documentId: 1, documentName: "Contrato_Maria_2024.pdf", rows: 4, preview: "CampoA | CampoB" },
    ];
    setTables(sample);
  }, [initial]);

  const documents = useMemo(
    () =>
      Array.from(
        new Map(tables.map((t) => [t.documentId, t.documentName])).values()
      ),
    [tables]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tables.filter((t) => {
      const matchesQ =
        !q ||
        t.documentName.toLowerCase().includes(q) ||
        (t.preview && t.preview.toLowerCase().includes(q));
      const matchesDoc = !docFilter || t.documentId === docFilter;
      return matchesQ && matchesDoc;
    });
  }, [tables, search, docFilter]);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <h3 className="text-lg font-semibold">Tablas Extraídas de Mis Documentos</h3>

        <div className="flex items-center gap-2">
          <div className="bg-slate-100 rounded-md px-2 py-1 hidden md:flex items-center">
            <span className="mr-2">🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar en tablas..."
              className="bg-transparent outline-none text-sm"
            />
          </div>

          <select
            onChange={(e) => setDocFilter(e.target.value ? Number(e.target.value) : "")}
            value={docFilter}
            className="border rounded-md px-2 py-1 text-sm"
          >
            <option value="">Todos los documentos</option>
            {Array.from(new Map(tables.map((t) => [t.documentId, t.documentName])).entries()).map(
              ([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-slate-500 text-sm">No hay tablas que coincidan.</p>
      ) : (
        <ul className="space-y-3">
          {filtered.map((t) => (
            <li key={t.id} className="p-4 border rounded-md flex justify-between items-center">
              <div>
                <div className="font-medium">{t.documentName}</div>
                <div className="text-slate-500 text-sm">{t.preview ?? `${t.rows} filas`}</div>
              </div>
              <div className="text-sm text-slate-600">{t.rows} filas</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
