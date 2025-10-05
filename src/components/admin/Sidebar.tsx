import logo from "../../assets/logo.jpg";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: any) => void;
}

export default function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const sections = [
    { key: "users", icon: "👥", label: "Gestión de Usuarios" },
    { key: "documents", icon: "📄", label: "Gestión de Documentos" },
    { key: "tables", icon: "📋", label: "Tablas Extraídas" },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg hidden md:block">
      <div className="flex items-center gap-3 px-4 py-3 border-b">
        <img src={logo} alt="DocsFlow" className="w-12 h-12 rounded-md" />
        <h2 className="text-lg font-bold text-blue-600">DocsFlow</h2>
      </div>

      <nav className="mt-4">
        <ul>
          {sections.map((item) => (
            <li key={item.key}>
              <button
                onClick={() => setActiveSection(item.key)}
                className={`flex items-center gap-2 w-full text-left px-4 py-2 rounded transition 
                ${activeSection === item.key ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-gray-100"}`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
