import { useEffect } from "react";
import "../../src/index.css";
interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
}

export default function Toast({ message, type = "success", onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: "bg-green-500",
    error: "bg-red-300",
    info: "bg-blue-300",
  };

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-2 rounded-lg text-white shadow-lg animate-fadeIn ${colors[type]}`}
    >
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
