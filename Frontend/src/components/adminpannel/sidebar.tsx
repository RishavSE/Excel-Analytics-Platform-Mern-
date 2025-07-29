// Sidebar.tsx
import React from 'react';
import { MdDashboard } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import './adminpannel.css';
import { useAuth } from '../../Appcontext';

interface SidebarProps {
  onSelectTab: (tab: 'dashboard' | 'users' | 'settings') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectTab }) => {
  const { email, role, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <aside className="sideba">
      <div className="sideba-title">Admin Panel</div>

      <div className="user-info">
        <strong>{role?.toUpperCase()}</strong>
        <p>{email || 'No email found'}</p>
      </div>

      <nav className="sideba-nav">
        <div className="sideba-nav-link" onClick={() => onSelectTab('dashboard')}>
          <MdDashboard className="sideba-icon" /> Dashboard
        </div>

        <div className="sideba-nav-link" onClick={() => onSelectTab('users')}>
          <FaUser className="sideba-icon" /> Users
        </div>

        {/* <div className="sideba-nav-link" onClick={() => onSelectTab('settings')}>
          <MdSettings className="sideba-icon" /> Settings
        </div> */}

        <button className="logout-button" onClick={handleLogout}>
          🚪 Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
