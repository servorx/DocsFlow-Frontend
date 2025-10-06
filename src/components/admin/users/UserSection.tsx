import { useEffect, useState, useCallback } from "react";
import {
  getAllUsers,
  getUsersByDepartment,
  createUser,
  updateUser,
  deleteUser,
  type User,
} from "../../../services/admin/userService";
import UserTable from "./UserTable";
import UserFilters from "./UserFilters";
import UserModal from "./UserModal";
import ConfirmDialog from "./ConfirmDialog";
import Toast from "../../Toast";

export default function UsersSection() {
  // Estado principal
  const [users, setUsers] = useState<User[]>([]);
  const [department, setDepartment] = useState("Todos");
  const [query, setQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<User | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [loading, setLoading] = useState(false);

  // Función para cargar usuarios según filtros
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data =
        department === "Todos"
          ? await getAllUsers()
          : await getUsersByDepartment(Number(department));

      // Filtrado por búsqueda local
      const filtered = data.filter((u) =>
        u.name.toLowerCase().includes(query.toLowerCase())
      );

      setUsers(filtered);
    } catch (err) {
      console.error("Error al cargar usuarios:", err);
      setToast({ message: "Error al cargar los usuarios ❌", type: "error" });
    } finally {
      setLoading(false);
    }
  }, [department, query]);

  // crear o actualizar usuario
  const handleSave = async (userData: Partial<User>): Promise<boolean> => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id_user, userData);
        setToast({ message: "Usuario actualizado correctamente ✅", type: "success" });
      } else {
        await createUser(userData);
        setToast({ message: "Usuario creado correctamente ✅", type: "success" });
      }

      await fetchUsers();
      setShowModal(false);
      setSelectedUser(null);
      return true;
    } catch (err) {
      console.error("Error al guardar usuario:", err);
      setToast({ message: "Error al guardar el usuario ❌", type: "error" });
      return false;
    }
  };

  // elimiar usuario
  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      await deleteUser(confirmDelete.id_user);
      setToast({ message: "Usuario eliminado correctamente ✅", type: "success" });
      await fetchUsers();
    } catch (err) {
      console.error("Error al eliminar usuario:", err);
      setToast({ message: "Error al eliminar el usuario ❌", type: "error" });
    } finally {
      setConfirmDelete(null);
    }
  };

  // cargar usuarios al inicio y al cambiar filtros
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <section className="bg-white rounded-lg shadow-md overflow-hidden relative">
      {/* Encabezado y filtros */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b p-4 bg-gray-50">
        <h3 className="font-semibold text-lg text-blue-700">Gestión de Usuarios</h3>
        <UserFilters
          onSearch={setQuery}
          onDepartmentFilter={setDepartment}
          onAdd={() => {
            setSelectedUser(null);
            setShowModal(true);
          }}
        />
      </div>
      {/* Tabla de usuarios */}
      <div className="relative min-h-[200px]">
        {loading ? (
          <div className="flex justify-center items-center py-10 text-gray-500 text-sm">
            Cargando usuarios...
          </div>
        ) : users.length === 0 ? (
          <div className="flex justify-center items-center py-10 text-gray-500 text-sm">
            No se encontraron usuarios.
          </div>
        ) : (
          <UserTable
            users={users}
            onEdit={(u) => {
              setSelectedUser(u);
              setShowModal(true);
            }}
            onDelete={(u) => setConfirmDelete(u)}
          />
        )}
      </div>
      {/* Modales y notificaciones */}
      {showModal && (
        <UserModal
          user={selectedUser}
          onClose={() => {
            setShowModal(false);
            setSelectedUser(null);
          }}
          onSave={handleSave}
        />
      )}
      {/* Confirmación de eliminación */}
      {confirmDelete && (
        <ConfirmDialog
          title="Eliminar usuario"
          message={`¿Seguro que deseas eliminar a ${confirmDelete.name}?`}
          onCancel={() => setConfirmDelete(null)}
          onConfirm={handleDelete}
        />
      )}
      {/* Notificación */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
}
