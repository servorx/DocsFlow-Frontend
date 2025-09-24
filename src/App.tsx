// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Login from "./layouts/Login";
import ForgotPassword from "./layouts/ForgotPassword";
import AdminDashboard from "./layouts/AdminDashboard";
import ResetPassword from "./layouts/ResetPassword";
import OperatorDashboard from "./layouts/OperatorDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/operator" element={<OperatorDashboard />} />
      <Route path="/reset" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
