import { Link, useNavigate } from "react-router-dom";
import RoleSelector from "../components/RoleSelector";
import logo from "../assets/logo.jpg";
import { useState, useEffect } from "react";
import { registerUser } from "../utils/api";

interface Department {
  id_department: number;
  name_department: string;
}

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"operator" | "admin">("operator");
  const [idDepartment, setIdDepartment] = useState<number>(0);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/departments/departments")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar departamentos");
        return res.json();
      })
      .then((data) => {
        console.log("Departamentos API:", data);
        setDepartments(data);
      })
      .catch((err) => {
        console.error(err);
        setError("No se pudieron cargar los departamentos");
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) return setError("El nombre es obligatorio");
    if (!email.includes("@")) return setError("Correo inválido");
    if (password.length < 8) return setError("La contraseña debe tener al menos 8 caracteres");
    if (password !== confirmPassword) return setError("Las contraseñas no coinciden");
    if (idDepartment === 0) return setError("Debes seleccionar un departamento");

    setLoading(true);

    try {
      const payload = {
        name,
        email,
        password,
        role,
        id_department: idDepartment,
      };
      console.log("Datos enviados a la API:", payload);

      const response = await registerUser(payload);
      console.log("Usuario creado:", response);

      navigate(role === "admin" ? "/admin" : "/operator");
    } catch (err) {
      console.error(err);
      setError("No se pudo crear la cuenta. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-slate-50">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <img src={logo} alt="DocsFlow" className="w-44 h-44 mx-auto rounded-md" />
          <h1 className="text-2xl font-bold text-blue-600">Registro</h1>
          <p className="text-slate-500">Crea tu cuenta en DocsFlow</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

          {/* Nombre */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-900">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full p-3 border border-slate-300 rounded-md shadow-sm text-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-900">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full p-3 border border-slate-300 rounded-md shadow-sm text-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-900">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full p-3 border border-slate-300 rounded-md shadow-sm text-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>

          {/* Confirmar Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-900">
              Confirmar contraseña
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 w-full p-3 border border-slate-300 rounded-md shadow-sm text-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>

          {/* Selector de Rol */}
          <RoleSelector role={role} setRole={setRole} />

          {/* Selector de Departamento */}
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-slate-900">
              Departamento
            </label>
            <select
              id="department"
              value={idDepartment}
              onChange={(e) => setIdDepartment(Number(e.target.value))}
              required
              className="mt-1 w-full p-3 border border-slate-300 rounded-md shadow-sm text-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:outline-none"
            >
              <option value={0}>Selecciona el departamento</option>
              {departments.map((dep) => (
                <option key={dep.id_department} value={dep.id_department}>
                  {dep.name_department}
                </option>
              ))}
            </select>
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 rounded-md px-4 py-3 font-medium shadow transition focus:outline-none focus:ring 
              ${
                loading
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400"
              }`}
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Crear cuenta"
            )}
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}