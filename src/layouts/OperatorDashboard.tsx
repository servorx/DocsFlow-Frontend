import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatsCards from "../components/StatsCards";
import QuickActions from "../components/QuickActions";
import RecentDocuments from "../components/RecentDocuments";
import UploadForm from "../components/UploadForm";
import DocumentsTable from "../components/DocumentsTable";
import TablesView from "../components/TablesView";
  
export default function OperatorDashboard() {
  const [section, setSection] = useState<"dashboard" | "upload" | "documents" | "tables">("dashboard");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar section={section} setSection={setSection} />

      {/* Main Content */}
      <div className="flex-1 ml-72 bg-slate-50">
        <Header section={section} />

        <main className="p-6 space-y-6">
          {section === "dashboard" && (
            <>
              <StatsCards />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <QuickActions />
                <RecentDocuments />
              </div>
            </>
          )}

          {section === "upload" && <UploadForm />}
          {section === "documents" && <DocumentsTable />}
          {section === "tables" && <TablesView />}
        </main>
      </div>
    </div>
  );
}
