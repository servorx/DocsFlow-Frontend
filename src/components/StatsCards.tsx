import { useEffect, useState } from "react";

type Stat = {
  id: string;
  value: number;
  label: string;
};

type Props = {
  // opcional: si pasas stats desde arriba, se usan; si no, se usan datos mock
  stats?: Stat[];
};

export default function StatsCards({ stats }: Props) {
  const [localStats, setLocalStats] = useState<Stat[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (stats && stats.length) {
      setLocalStats(stats);
      setLoading(false);
      return;
    }

    // simulación de carga; aquí reemplaza por llamada al backend si quieres
    const timer = setTimeout(() => {
      setLocalStats([
        { id: "docs", value: 15, label: "Mis Documentos" },
        { id: "tables", value: 23, label: "Tablas Extraídas" },
        { id: "month", value: 8, label: "Este Mes" },
        { id: "pending", value: 2, label: "En Procesamiento" },
      ]);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [stats]);

  // skeletons si está cargando
  if (loading || !localStats) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow border-l-4 border-blue-600 animate-pulse"
          >
            <div className="h-8 w-24 bg-slate-200 rounded mb-3"></div>
            <div className="h-4 w-20 bg-slate-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {localStats.map((s) => (
        <div
          key={s.id}
          className="bg-white p-6 rounded-xl shadow border-l-4 border-blue-600"
          role="region"
          aria-labelledby={`stat-${s.id}`}
        >
          <div id={`stat-${s.id}`} className="text-3xl font-bold text-blue-600">
            {s.value}
          </div>
          <div className="text-slate-600">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
