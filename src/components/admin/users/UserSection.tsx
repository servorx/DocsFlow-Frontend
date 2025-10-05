import { useEffect, useState } from "react";
import { getAllUsers, getUsersByDepartment, type User } from "../../../services/admin/userService";
import UserTable from "./UserTable";
import UserFilters from "./UserFilters";

export default function UsersSection() {
  const [users, setUsers] = useState<User[]>([]);
  const [department, setDepartment] = useState("Todos");
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = department === "Todos"
          ? await getAllUsers()
          : await getUsersByDepartment(department);
        setUsers(
          data.filter((u) =>
            u.name.toLowerCase().includes(query.toLowerCase())
          )
        );
      } catch (err) {
        console.error(err);
      }
    }
    fetchUsers();
  }, [department, query]);

  return (
    <section className="bg-white rounded-lg shadow overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b p-4">
        <h3 className="font-semibold">Gestión de Usuarios</h3>
        <UserFilters onSearch={setQuery} onDepartmentFilter={setDepartment} />
      </div>
      <UserTable users={users} />
    </section>
  );
}
