"use client";
import { useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";
import UsersSection from "../components/admin/users/UserSection";
import DocumentsSection from "../components/admin/documents/DocumentsSection";
import TablesSection from "../components/admin/tables/TablesSection";

type Section = | "users" | "documents" | "tables";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<Section>("users");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main */}
      <main className="flex-1 flex flex-col md:ml-64">
        <Header activeSection={activeSection} />

        <div className="flex-1 p-6 overflow-y-auto">
          {activeSection === "users" && <UsersSection />}
          {activeSection === "documents" && <DocumentsSection />}
          {activeSection === "tables" && <TablesSection />}
        </div>
      </main>
    </div>
  );
}
