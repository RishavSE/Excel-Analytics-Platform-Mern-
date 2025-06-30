// import React from "react";
// import { NavLink } from "react-router-dom";
// import { FaChartBar, FaFileUpload, FaCog, FaSignOutAlt } from "react-icons/fa";

// const Sideb: React.FC = () => {
//   return (
//     <div style={{ width: "250px", background: "#007bff", height: "100vh", padding: "1rem", color: "white" }}>
//       <h2 style={{ marginBottom: "2rem" }}>📊 Excel Analytics</h2>
//       <ul style={{ listStyle: "none", padding: 0 }}>
//         {navItems.map((item, index) => (
//           <li key={index}>
//             <NavLink
//               to={item.path}
//               style={({ isActive }) => ({
//                 ...linkStyle,
//                 textDecoration: "none",
//                 color: "white",
//                 background: isActive ? "#0056b3" : "transparent",
//                 padding: "0.5rem",
//                 borderRadius: "5px",
//               })}
//             >
//               {item.icon}
//               <span>{item.label}</span>
//             </NavLink>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// const linkStyle: React.CSSProperties = {
//   display: "flex",
//   alignItems: "center",
//   gap: "10px",
//   marginBottom: "1rem",
// };

// const navItems = [
//   { label: "Dashboard", path: "/dashboard", icon: <FaChartBar /> },
//   { label: "Upload Excel", path: "/upload", icon: <FaFileUpload /> },
//   { label: "Analyses", path: "/chart-builder", icon: <FaChartBar /> },
//   { label: "Logout", path: "", icon: <FaSignOutAlt /> },
// ];

// export default Sideb;


import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaChartBar, FaFileUpload, FaSignOutAlt } from "react-icons/fa";

const Sideb: React.FC = () => {
  const navigate = useNavigate();

  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      style={{
        width: "250px",
        background: "#007bff",
        height: "100vh",
        padding: "1rem 1.2rem",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <h2 style={{ marginBottom: "1.5rem" }}>📊 Excel Analytics</h2>

      {/* ✅ Styled Role & Email Badge */}
      <div
        style={{
          width: "100%",
          background: "linear-gradient(to right, #6a00f6, #1e90ff)",
          padding: "10px 0",
          borderRadius: "12px",
          textAlign: "center",
          marginBottom: "2rem",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ fontWeight: "bold", color: "#fff", fontSize: "1rem" }}>
          {role?.toUpperCase() || "GUEST"}
        </div>
        <div style={{ color: "#fff", fontSize: "0.85rem", marginTop: "2px" }}>
          {email || "No email"}
        </div>
      </div>

      <ul style={{ listStyle: "none", padding: 0, width: "100%" }}>
        {navItems.map((item, index) => (
          <li key={index}>
            {item.label === "Logout" ? (
              <button
                onClick={handleLogout}
                style={{
                  ...linkStyle,
                  background: "transparent",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ) : (
              <NavLink
                to={item.path}
                style={({ isActive }) => ({
                  ...linkStyle,
                  textDecoration: "none",
                  color: "white",
                  background: isActive ? "#0056b3" : "transparent",
                  padding: "0.5rem",
                  borderRadius: "5px",
                })}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const linkStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "1rem",
};

const navItems = [
  { label: "Dashboard", path: "/user-dashboard/home", icon: <FaChartBar /> },
  { label: "Upload Excel", path: "/user-dashboard/upload", icon: <FaFileUpload /> },
  { label: "Analyses", path: "/user-dashboard/chart-builder", icon: <FaChartBar /> },
  { label: "Logout", path: "/logout", icon: <FaSignOutAlt /> },
];

export default Sideb;
