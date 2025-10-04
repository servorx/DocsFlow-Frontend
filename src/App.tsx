// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Login from "./layouts/Login";
import ForgotPassword from "./layouts/ForgotPassword";
import AdminDashboard from "./layouts/AdminDashboard";
import ResetPassword from "./layouts/ResetPassword";
import OperatorDashboard from "./layouts/OperatorDashboard";
import Register from "./layouts/Register";
import PrivateRoute from "./utils/PrivateRoute";
import Unauthorized from "./components/Unauthorized";

function App() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/" element={<Register />} />

      {/* Rutas privadas */}
      <Route
        path="/admin"
        element={
          <PrivateRoute role="admin">
            <AdminDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/operator"
        element={
          <PrivateRoute role="operator">
            <OperatorDashboard />
          </PrivateRoute>
        }
      />

      {/* Acceso no autorizado */}
      <Route
        path="/unauthorized"
        element={
          <Unauthorized />
        }
      />
    </Routes>
  );
}

export default App;
