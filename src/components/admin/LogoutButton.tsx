export default function LogoutButton() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-red-600"
    >
      Cerrar Sesión
    </button>
  );
}
