// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
