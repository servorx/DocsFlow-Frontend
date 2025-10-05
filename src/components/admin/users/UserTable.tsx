import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser, deactivateUser } from "../../../services/admin/userService";
import { type User } from "../../../services/admin/userService";

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDeactivate = async (id: number) => {
    await deactivateUser(id);
    loadUsers();
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Seguro que deseas eliminar este usuario?")) {
      await deleteUser(id);
      loadUsers();
    }
  };

  if (loading) return <p>Cargando usuarios...</p>;

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
                  onClick={() => handleDeactivate(u.id_user)}
                  className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded"
                >
                  Desactivar
                </button>
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
