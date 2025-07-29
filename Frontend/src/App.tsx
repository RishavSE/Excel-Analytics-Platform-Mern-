
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminPannel from "./components/adminpannel/adminpannel1";
import Dashboard from "./components/user-dashboard/Alayout";
import { useAuth } from "./Appcontext";
import Users from "./components/adminpannel/users";

const App = () => {
  const { token, role } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔐 Admin Dashboard */}
        <Route
          path="/adminpannel1"
          element={token && role === "admin" ? <AdminPannel /> : <Navigate to="/login" />}
        />
        {/* ✅ Admin Users Route */}
        <Route
          path="/adminpannel1/users"
          element={token && role === "admin" ? <Users /> : <Navigate to="/login" />}
        />

        {/* 🔐 User Dashboard */}
        <Route
          path="/user-dashboard/*"
          element={token && role === "user" ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
