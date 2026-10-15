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


import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaChartBar, FaFileUpload, FaSignOutAlt, FaTimes } from "react-icons/fa";

const Sideb: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <aside className={`user-sidebar${isMenuOpen ? " is-open" : ""}`}>
      <div className="user-sidebar-header">
        <h2 className="user-sidebar-title">📊 Excel Analytics</h2>
        <button
          type="button"
          className="user-menu-toggle"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="user-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className="user-sidebar-profile">
        <div className="user-sidebar-role">
          {role?.toUpperCase() || "GUEST"}
        </div>
        <div className="user-sidebar-email">
          {email || "No email"}
        </div>
      </div>

      <ul id="user-navigation" className="user-navigation">
        {navItems.map((item, index) => (
          <li key={index}>
            {item.label === "Logout" ? (
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="user-sidebar-link user-sidebar-logout"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ) : (
              <NavLink
                to={item.path}
                className="user-sidebar-link"
                onClick={() => setIsMenuOpen(false)}
                style={({ isActive }) => ({
                  ...linkStyle,
                  textDecoration: "none",
                  color: "white",
                  background: isActive ? "#0056b3" : "transparent",
                })}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

const linkStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const navItems = [
  { label: "Dashboard", path: "/user-dashboard/home", icon: <FaChartBar /> },
  { label: "Upload Excel", path: "/user-dashboard/upload", icon: <FaFileUpload /> },
  { label: "Analyses", path: "/user-dashboard/chart-builder", icon: <FaChartBar /> },
  { label: "Logout", path: "/logout", icon: <FaSignOutAlt /> },
];

export default Sideb;
