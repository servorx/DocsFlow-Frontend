import { useState } from "react";
import UserMenu from "./UserMenu";

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const titles: Record<string, string> = {
    dashboard: "Panel de Administración",
    users: "Gestión de Usuarios",
    documents: "Gestión de Documentos",
    tables: "Tablas Extraídas",
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b bg-white shadow-sm">
      <h1 className="text-lg font-semibold">{titles[activeSection]}</h1>

      <div className="relative">
        <button
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded hover:bg-gray-200"
        >
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
            A
          </div>
          <span>Administrador</span>
          <span>▼</span>
        </button>

        {isUserMenuOpen && <UserMenu />}
      </div>
    </header>
  );
}
