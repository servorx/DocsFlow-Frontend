interface Document {
  id: number;
  title: string;
  department: string;
  owner: string;
  date: string;
  status: string;
}

interface DocumentTableProps {
  documents: Document[];
}

export default function DocumentTable({ documents }: DocumentTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead className="bg-gray-100 text-left text-xs uppercase">
          <tr>
            {["ID", "Título", "Departamento", "Propietario", "Fecha", "Estado", "Acciones"].map((header) => (
              <th key={header} className="px-4 py-2 font-semibold text-gray-600">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {documents.length > 0 ? (
            documents.map((doc) => (
              <tr key={doc.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{doc.id}</td>
                <td className="px-4 py-2">{doc.title}</td>
                <td className="px-4 py-2">{doc.department}</td>
                <td className="px-4 py-2">{doc.owner}</td>
                <td className="px-4 py-2">{doc.date}</td>
                <td className="px-4 py-2">{doc.status}</td>
                <td className="px-4 py-2 text-blue-600 cursor-pointer">Ver / Eliminar</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-500">
                No se encontraron documentos.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
