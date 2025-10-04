function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold text-red-600">Acceso no autorizado</h1>
      <p className="mt-2 text-slate-600">
        No tienes permisos para acceder a esta sección.
      </p>
      <a href="/login" className="mt-4 text-blue-600 hover:underline">
        Volver al inicio de sesión
      </a>
    </div>
  )
}

export default Unauthorized