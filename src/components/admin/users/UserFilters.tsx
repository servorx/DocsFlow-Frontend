import type { User } from "../../../services/admin/userService";

interface UserFiltersProps {
  onSearch: (query: string) => void;
  onDepartmentFilter: (department: string) => void;
  onAdd: () => void;
}


export default function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  if (!users.length)
    return <p className="p-4 text-gray-500">No hay usuarios disponibles.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2">Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Activo</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id_user} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.is_active ? "✅" : "❌"}</td>
              <td className="flex justify-center gap-2 py-2">
                <button
                  onClick={() => onEdit(u)}
                  className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(u)}
                  className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
