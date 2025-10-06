// src/components/layout/Header.tsx
import { useState } from "react";
import UserMenuDropdown from "./UserMenuDropdown";

type HeaderProps = {
  section: "dashboard" | "upload" | "documents" | "tables";
};

function Header({ section }: HeaderProps) {
  const [openMenu, setOpenMenu] = useState(false);

  const sectionTitles: Record<HeaderProps["section"], string> = {
    dashboard: "Mi Panel",
    upload: "Subir Documentos",
    documents: "Mis Documentos",
    tables: "Tablas Extraídas",
  };

  return (
    <header className="flex items-center justify-between bg-white border-b border-slate-200 px-6 py-4">
      {/* Aquí usamos la prop `section` */}
      <h1 className="text-xl font-bold text-slate-800">
        {sectionTitles[section] || "DocsFlow"}
      </h1>

      <div className="flex items-center gap-4">
        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
          Recursos Humanos
        </span>
        <div className="relative">
          <button
            className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-md"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              O
            </div>
            <span>Operador</span>
            <span>▼</span>
          </button>

          {openMenu && <UserMenuDropdown onClose={() => setOpenMenu(false)} />}
        </div>
      </div>
    </header>
  );
}

export default Header;