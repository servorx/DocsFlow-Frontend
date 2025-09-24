// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Login from "./layouts/Login";
import ForgotPassword from "./components/ForgotPassword";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
