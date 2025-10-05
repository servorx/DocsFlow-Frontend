import { useState } from "react";

interface DocumentFiltersProps {
  onSearch: (query: string) => void;
  onDepartmentFilter: (department: string) => void;
}

export default function DocumentFilters({
  onSearch,
  onDepartmentFilter,
}: DocumentFiltersProps) {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("Todos");

  return (
    <div className="flex flex-wrap items-center gap-3">
      <input
        type="text"
        placeholder="Buscar documentos..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          onSearch(e.target.value);
        }}
        className="border rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <select
        value={department}
        onChange={(e) => {
          setDepartment(e.target.value);
          onDepartmentFilter(e.target.value);
        }}
        className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="Todos">Todos los departamentos</option>
        <option value="Finanzas">Finanzas</option>
        <option value="Operaciones">Operaciones</option>
        <option value="Legal">Legal</option>
      </select>

      <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700 transition-colors">
        + Subir Documento
      </button>
    </div>
  );
}
