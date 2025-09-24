// src/components/layout/UserMenuDropdown.tsx
type Props = {
  onClose: () => void;
};

function UserMenuDropdown({ onClose }: Props) {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border p-3">
      <button
        onClick={() => {
          alert("Cerrar sesión");
          onClose();
        }}
        className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 rounded-md"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}

export default UserMenuDropdown;