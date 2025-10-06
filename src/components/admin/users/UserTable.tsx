import React from "react";
import type { User } from "../../../services/admin/userService";
import { deleteUser } from "../../../services/admin/userService";

interface UserTableProps {
  users: User[];
  onReload?: () => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onReload }) => {

  const handleDelete = async (id: number) => {
    if (confirm("¿Seguro que deseas eliminar este usuario?")) {
      await deleteUser(id);
      onReload?.();
    }
  };

  if (!users.length) return <p className="p-4 text-gray-500">No hay usuarios disponibles.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2">Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id_user} className="border-b">
              <td className="px-4 py-2">{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.is_active ? "✅" : "❌"}</td>
              <td className="flex gap-2 py-2">
                <button
                  onClick={() => handleDelete(u.id_user)}
                  className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded"
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
};

export default UserTable;
