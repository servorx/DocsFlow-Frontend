export default function AdminStatsCards() {
  const stats = [
    { label: "Usuarios Totales", value: "124" },
    { label: "Documentos Totales", value: "458" },
    { label: "Tablas Extraídas", value: "210" },
    { label: "Usuarios Activos", value: "97" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((s) => (
        <div key={s.label} className="bg-white shadow rounded-lg p-4 text-center">
          <div className="text-2xl font-bold">{s.value}</div>
          <div className="text-gray-500 text-sm">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
