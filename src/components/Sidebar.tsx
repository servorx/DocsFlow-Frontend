import logo from "../assets/logo.jpg";

type Props = {
  section: string;
  setSection: (s: "dashboard" | "upload" | "documents" | "tables") => void;
};

export default function Sidebar({ section, setSection }: Props) {
  return (
    <aside className="w-72 bg-white border-r border-slate-200 p-6 fixed h-screen overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 pb-4 border-b">
        <img src={logo} alt="DocsFlow" className="w-10 h-10 rounded" />
        <h2 className="text-blue-600 font-semibold text-lg">DocsFlow</h2>
      </div>

      {/* Menu */}
      <nav>
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => setSection("dashboard")}
              className={`flex items-center gap-2 w-full px-4 py-2 rounded-md text-left transition ${
                section === "dashboard"
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              📊 Mi Panel
            </button>
          </li>
          <li>
            <button
              onClick={() => setSection("upload")}
              className={`flex items-center gap-2 w-full px-4 py-2 rounded-md text-left transition ${
                section === "upload"
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              📤 Subir Documentos
            </button>
          </li>
          <li>
            <button
              onClick={() => setSection("documents")}
              className={`flex items-center gap-2 w-full px-4 py-2 rounded-md text-left transition ${
                section === "documents"
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              📄 Mis Documentos
            </button>
          </li>
          <li>
            <button
              onClick={() => setSection("tables")}
              className={`flex items-center gap-2 w-full px-4 py-2 rounded-md text-left transition ${
                section === "tables"
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              📋 Tablas Extraídas
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
