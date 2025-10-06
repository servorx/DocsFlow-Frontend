import { useState, useEffect } from "react";
import type { User } from "../../../services/admin/userService";
import { useDepartments } from "../../../hooks/useDepartments"; 
import Toast from "../../Toast";

interface UserModalProps {
  user: User | null;
  onClose: () => void;
  onSave: (userData: Partial<User>) => Promise<boolean>; 
}

export default function UserModal({ user, onClose, onSave }: UserModalProps) {
  const [formData, setFormData] = useState<Partial<User>>({
    name: "",
    email: "",
    role: "operator",
    id_department: 0,
  });

  // usar el hook de departamentos
  const { departments, loading, error } = useDepartments();
  // usar toast para notificaciones
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Cargar datos del usuario
  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "id_department" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const success = await onSave(formData);
      if (success) {
        setToast({
          message: user
            ? "Usuario actualizado correctamente ✅"
            : "Usuario creado correctamente ✅",
          type: "success",
        });
        setTimeout(() => {
          setToast(null);
          onClose();
        }, 2000);
      }
    } catch (error) {
      setToast({ message: "Error al guardar el usuario ❌", type: "error" });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h3 className="text-lg font-semibold text-blue-700 mb-4">
          {user ? "Editar usuario" : "Nuevo usuario"}
        </h3>

        {/* Nombre */}
        <label className="block text-sm font-medium mb-1">Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name ?? ""}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mb-3"
          required
        />

        {/* Email */}
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email ?? ""}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mb-3"
          required
        />

        {/* Contraseña (solo si es nuevo usuario) */}
        {!user && (
          <>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password ?? ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mb-3"
              required
            />
          </>
        )}

        {/* Rol */}
        <label className="block text-sm font-medium mb-1">Rol</label>
        <select
          name="role"
          value={formData.role ?? "user"}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mb-3"
        >
          <option value="admin">Administrador</option>
          <option value="operator">Operador</option>
        </select>

        {/* Departamento */}
        <label className="block text-sm font-medium mb-1">Departamento</label>
        {loading ? (
          <p className="text-sm text-gray-500 mb-3">Cargando departamentos...</p>
        ) : error ? (
          <p className="text-sm text-red-500 mb-3">{error}</p>
        ) : (
          <select
            name="id_department"
            value={formData.id_department ?? 0}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded mb-3"
            required
          >
            <option value={0}>Selecciona un departamento</option>
            {departments.map((dep) => (
              <option key={dep.id_department} value={dep.id_department}>
                {dep.name_department}
              </option>
            ))}
          </select>
        )}

        {/* Botones */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Guardar
          </button>
        </div>

        {/* ✅ Toast de confirmación */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </form>
    </div>
  );
}
