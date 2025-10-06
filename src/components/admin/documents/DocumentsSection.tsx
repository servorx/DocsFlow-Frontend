import { useState } from "react";
import DocumentFilters from "./DocumentFilters";
import DocumentTable from "./DocumentTable";

export default function DocumentsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("Todos");

  const documents = [
    {
      id: 1,
      title: "Informe Financiero Q1",
      department: "Finanzas",
      owner: "Ana López",
      date: "2025-10-01",
      status: "Aprobado",
    },
    {
      id: 2,
      title: "Política de Seguridad",
      department: "Operaciones",
      owner: "Carlos Pérez",
      date: "2025-09-15",
      status: "Pendiente",
    },
  ].filter(
    (doc) =>
      (departmentFilter === "Todos" || doc.department === departmentFilter) &&
      doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="bg-white rounded-lg shadow overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b p-4">
        <h3 className="font-semibold">Gestión de Documentos</h3>
        <DocumentFilters
          onSearch={setSearchQuery}
          onDepartmentFilter={setDepartmentFilter}
        />
      </div>
      <DocumentTable documents={documents} />
    </section>
  );
}
