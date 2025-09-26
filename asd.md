1. ¿Dónde usarías tu apiFetch?

Tu apiFetch de utils/api.ts es un helper centralizado para consumir tu backend FastAPI.
Ejemplos claros en tu proyecto:

Login.tsx → cuando el usuario hace login (POST /auth/login).

UploadForm.tsx → para subir un documento (POST /documents/upload).

DocumentsTable.tsx → para listar documentos (GET /documents/).

RecentDocuments.tsx → para mostrar los últimos documentos (GET /documents/).

TablesView.tsx → para cargar tablas extraídas (GET /tables/:documentId).

AdminDashboard.tsx → sección de Users → para listar usuarios (GET /users/).

En resumen: todos los componentes que hacen fetch de datos o envían formularios deberían usar apiFetch. Los demás componentes de UI (como Sidebar, StatsCards, QuickActions) no necesitan conectarse directamente a la API.