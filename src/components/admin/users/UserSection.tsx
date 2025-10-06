import { useEffect, useState } from "react";
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

export default function UsersSection() {
  const [users, setUsers] = useState<User[]>([]);
  const [department, setDepartment] = useState("Todos");
  const [query, setQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      const data =
        department === "Todos"
          ? await getAllUsers()
          : await getUsersByDepartment(parseInt(department));
      setUsers(
        data.filter((u) =>
          u.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } catch (err) {
      console.error("Error al cargar usuarios:", err);
    }
  };

  const handleSave = async (userData: Partial<User>) => {
    try {
      const res = selectedUser
        ? await updateUser(selectedUser.id_user, userData)
        : await createUser(userData);

      console.log("Respuesta del servidor:", res);

      await fetchUsers();
      setShowModal(false);
      setSelectedUser(null);
    } catch (err) {
      console.error("Error al guardar usuario:", err);
    }
  };


  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      await deleteUser(confirmDelete.id_user);
      setConfirmDelete(null);
      await fetchUsers();
    } catch (err) {
      console.error("Error al eliminar usuario:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [department, query]);

  return (
    <section className="bg-white rounded-lg shadow overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b p-4">
        <h3 className="font-semibold text-lg text-blue-700">Gestión de Usuarios</h3>
        <UserFilters
          onSearch={setQuery}
          onDepartmentFilter={setDepartment}
          onAdd={() => setShowModal(true)}
        />
      </div>

      <UserTable
        users={users}
        onEdit={(u) => {
          setSelectedUser(u);
          setShowModal(true);
        }}
        onDelete={(u) => setConfirmDelete(u)}
      />

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

      {confirmDelete && (
        <ConfirmDialog
          title="Eliminar usuario"
          message={`¿Seguro que deseas eliminar a ${confirmDelete.name}?`}
          onCancel={() => setConfirmDelete(null)}
          onConfirm={handleDelete}
        />
      )}
    </section>
  );
}
