import { useState } from "react";

interface UserFiltersProps {
  onSearch: (query: string) => void;
  onDepartmentFilter: (department: string) => void;
  onAdd: () => void;
}

export default function UserFilters({
  onSearch,
  onDepartmentFilter,
  onAdd,
}: UserFiltersProps) {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("Todos");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setDepartment(value);
    onDepartmentFilter(value);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <input
        type="text"
        placeholder="Buscar usuarios..."
        value={search}
        onChange={handleSearchChange}
        className="border rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <select
        value={department}
        onChange={handleDepartmentChange}
        className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="Todos">Todos los departamentos</option>
        <option value="Administración">Administración</option>
        <option value="Recursos Humanos">Recursos Humanos</option>
        <option value="Finanzas">Finanzas</option>
        <option value="Operaciones">Operaciones</option>
      </select>

      <button
        onClick={onAdd}
        className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700 transition-colors"
      >
        + Agregar Usuario
      </button>
    </div>
  );
}
