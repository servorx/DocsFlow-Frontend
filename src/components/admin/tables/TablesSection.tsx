export default function TablesSection() {
  const extractedTables = [
    { id: 1, name: "Tabla_Ventas_Q3", date: "2025-09-22", source: "Finanzas" },
    { id: 2, name: "Tabla_Personal_Act", date: "2025-09-10", source: "Recursos Humanos" },
  ];

  return (
    <section className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold mb-4">Tablas Extraídas</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-100 text-left text-xs uppercase">
            <tr>
              {["ID", "Nombre de Tabla", "Fecha de Extracción", "Departamento", "Acciones"].map(
                (header) => (
                  <th key={header} className="px-4 py-2 font-semibold text-gray-600">
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {extractedTables.map((table) => (
              <tr key={table.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{table.id}</td>
                <td className="px-4 py-2">{table.name}</td>
                <td className="px-4 py-2">{table.date}</td>
                <td className="px-4 py-2">{table.source}</td>
                <td className="px-4 py-2 text-blue-600 cursor-pointer">Ver / Eliminar</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
