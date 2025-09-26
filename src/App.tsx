// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Login from "./layouts/Login";
import ForgotPassword from "./layouts/ForgotPassword";
import AdminDashboard from "./layouts/AdminDashboard";
import ResetPassword from "./layouts/ResetPassword";
import OperatorDashboard from "./layouts/OperatorDashboard";
import Register from "./layouts/Register";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/forgot" element={<ForgotPassword />} />

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
      
      <Route path="/reset" element={<ResetPassword />} />

      <Route path="/" element={<Register />} /> 
    </Routes>
  );
}

export default App;
