import { useState, useEffect } from "react";
import { getAllDepartments, type Department } from "../../../services/admin/departmentService";

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
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar departamentos desde el backend
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const data = await getAllDepartments();
        setDepartments(data);
      } catch (err) {
        console.error("Error al cargar departamentos:", err);
        setError("No se pudieron cargar los departamentos.");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

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

      {/* 🏢 Filtro por departamento */}
      {loading ? (
        <p className="text-sm text-gray-500">Cargando...</p>
      ) : error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : (
        <select
          value={department}
          onChange={handleDepartmentChange}
          className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="Todos">Todos los departamentos</option>
          {departments.map((dep) => (
            <option key={dep.id_department} value={dep.id_department.toString()}>
              {dep.name_department}
            </option>
          ))}
        </select>
      )}

      <button
        onClick={onAdd}
        className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700 transition-colors"
      >
        + Agregar Usuario
      </button>
    </div>
  );
}
