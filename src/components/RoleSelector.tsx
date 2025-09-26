type Props = {
  role: "operator" | "admin";
  setRole: (role: "operator" | "admin") => void;
};

export default function RoleSelector({ role, setRole }: Props) {
  return (
    <div className="flex items-center justify-between gap-4">
      <label className="block text-sm font-medium text-slate-900">
        Tipo de cuenta
      </label>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as "operator" | "admin")}
        className="w-1/2 p-2 border border-slate-300 rounded-md shadow-sm text-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:outline-none"
      >
        <option value="operator">Operador</option>
        <option value="admin">Administrador</option>
      </select>
    </div>
  );
}
