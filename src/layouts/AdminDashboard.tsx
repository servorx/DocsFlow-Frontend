"use client";

import { useState } from "react";
import logo from "../assets/logo.jpg";

type Section = "dashboard" | "users" | "documents" | "tables";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<Section>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        <div className="flex items-center gap-3 px-4 py-2 border-b bg-white shadow-sm">
          <img
            src={logo}
            alt="DocsFlow"
            className="w-12 h-12 rounded-md object-contain"
          />
          <h2 className="text-lg font-bold text-blue-600">DocsFlow</h2>
        </div>

        <nav className="mt-4">
          <ul>
            {[
              { key: "dashboard", icon: "📊", label: "Panel Principal" },
              { key: "users", icon: "👥", label: "Gestión de Usuarios" },
              { key: "documents", icon: "📄", label: "Gestión de Documentos" },
              { key: "tables", icon: "📋", label: "Tablas Extraídas" },
            ].map((item) => (
              <li key={item.key}>
                <button
                  onClick={() => setActiveSection(item.key as Section)}
                  className={`flex items-center gap-2 w-full text-left px-4 py-2 transition-colors 
                  ${activeSection === item.key ? "bg-blue-100 text-blue-600 font-medium" : "hover:bg-gray-100"}`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col md:ml-64">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b bg-white shadow-sm">
          <div className="flex items-center gap-2">
            <button
              className="md:hidden p-2 bg-gray-200 rounded"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              ☰
            </button>
            <h1 className="text-lg font-semibold">
              {activeSection === "dashboard"
                ? "Panel de Administración"
                : activeSection === "users"
                ? "Gestión de Usuarios"
                : activeSection === "documents"
                ? "Gestión de Documentos"
                : "Tablas Extraídas"}
            </h1>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                A
              </div>
              <span>Administrador</span>
              <span>▼</span>
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md p-2">
                <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          {activeSection === "dashboard" && <DashboardSection />}
          {activeSection === "users" && <UsersSection />}
          {activeSection === "documents" && <DocumentsSection />}
          {activeSection === "tables" && <TablesSection />}
        </div>
      </main>
    </div>
  );
}

/* Dashboard Section */
function DashboardSection() {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Usuarios Totales", value: "12" },
          { label: "Documentos Totales", value: "248" },
          { label: "Tablas Extraídas", value: "156" },
          { label: "Usuarios Activos", value: "8" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white shadow rounded-lg p-4 text-center"
          >
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-gray-500 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b px-4 py-2">
          <h3 className="font-semibold">Actividad Reciente</h3>
        </div>
        <div className="p-4 text-gray-500 text-center">
          Cargando actividad reciente...
        </div>
      </div>
    </section>
  );
}

/* Users Section */
function UsersSection() {
  return (
    <section>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b p-4">
          <h3 className="font-semibold">Gestión de Usuarios</h3>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              placeholder="Buscar usuarios..."
              className="border rounded px-3 py-1"
            />
            <select className="border rounded px-2 py-1">
              <option>Todos los departamentos</option>
              <option>Administración</option>
              <option>Recursos Humanos</option>
              <option>Finanzas</option>
              <option>Operaciones</option>
            </select>
            <button className="bg-blue-600 text-white px-3 py-1 rounded">
              + Agregar Usuario
            </button>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left text-xs uppercase">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Departamento</th>
              <th className="px-4 py-2">Rol</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">Juan Pérez</td>
              <td className="px-4 py-2">juan@example.com</td>
              <td className="px-4 py-2">Operaciones</td>
              <td className="px-4 py-2">Admin</td>
              <td className="px-4 py-2">Activo</td>
              <td className="px-4 py-2">Editar / Eliminar</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* Documents Section */
function DocumentsSection() {
  return (
    <section>
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold">Gestión de Documentos</h3>
        <p className="text-gray-500 mt-2">Aquí va la tabla de documentos...</p>
      </div>
    </section>
  );
}

/* Tables Section */
function TablesSection() {
  return (
    <section>
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold">Tablas Extraídas</h3>
        <p className="text-gray-500 mt-2">Aquí va la gestión de tablas...</p>
      </div>
    </section>
  );
}
