import { useState, useEffect } from "react";
import type { User } from "../../../services/admin/userService";

interface Props {
  user: User | null;
  onClose: () => void;
  onSave: (data: Partial<User>) => void;
}

export default function UserModal({ user, onClose, onSave }: Props) {
  const [form, setForm] = useState<Partial<User>>({
    name: "",
    email: "",
    role: "",
    id_department: 1,
  });

  useEffect(() => {
    if (user) setForm(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          {user ? "Editar Usuario" : "Nuevo Usuario"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={form.name || ""}
            onChange={handleChange}
            className="border rounded px-3 py-1"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo"
            value={form.email || ""}
            onChange={handleChange}
            className="border rounded px-3 py-1"
            required
          />
          <input
            type="text"
            name="role"
            placeholder="Rol (admin, user, etc)"
            value={form.role || ""}
            onChange={handleChange}
            className="border rounded px-3 py-1"
            required
          />
          <select
            name="id_department"
            value={form.id_department || 1}
            onChange={handleChange}
            className="border rounded px-3 py-1"
          >
            <option value="1">Administración</option>
            <option value="2">Recursos Humanos</option>
            <option value="3">Finanzas</option>
            <option value="4">Operaciones</option>
          </select>

          <div className="flex justify-end gap-2 mt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 border rounded hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
