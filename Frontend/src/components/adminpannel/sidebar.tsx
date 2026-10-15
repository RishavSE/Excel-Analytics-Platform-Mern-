// Sidebar.tsx
import React, { useState } from 'react';
import { MdDashboard } from 'react-icons/md';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import './adminpannel.css';
import { useAuth } from '../../Appcontext';

interface SidebarProps {
  onSelectTab: (tab: 'dashboard' | 'users' | 'settings') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectTab }) => {
  const { email, role, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const handleSelectTab = (tab: 'dashboard' | 'users' | 'settings') => {
    onSelectTab(tab);
    setIsMenuOpen(false);
  };

  return (
    <aside className={`sideba${isMenuOpen ? ' is-open' : ''}`}>
      <div className="sideba-header">
        <div className="sideba-title">Admin Panel</div>
        <button
          type="button"
          className="admin-menu-toggle"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="admin-navigation"
          onClick={() => setIsMenuOpen(open => !open)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className="user-info">
        <strong>{role?.toUpperCase()}</strong>
        <p>{email || 'No email found'}</p>
      </div>

      <nav className="sideba-nav" id="admin-navigation">
        <button className="sideba-nav-link" onClick={() => handleSelectTab('dashboard')}>
          <MdDashboard className="sideba-icon" /> Dashboard
        </button>

        <button className="sideba-nav-link" onClick={() => handleSelectTab('users')}>
          <FaUser className="sideba-icon" /> Users
        </button>

        {/* <div className="sideba-nav-link" onClick={() => onSelectTab('settings')}>
          <MdSettings className="sideba-icon" /> Settings
        </div> */}

        <button className="logout-button" onClick={() => {
          setIsMenuOpen(false);
          handleLogout();
        }}>
          🚪 Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
