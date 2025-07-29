import React, { useEffect, useState } from 'react';
import './adminpannel.css';
import Sidebar from './sidebar';
import TopCards from './tocards';
import UsersTable from './usertable'; // Summary for Dashboard
import Users from './users';         // Full Data for Users tab
import { fetchAllUsersArray } from '../../api/api'; // ✅ updated
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

type User = {
  _id: string;
  name?: string;
  email: string;
  role: 'admin' | 'user';
  status?: string;
};

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedTab, setSelectedTab] = useState<'dashboard' | 'users' | 'settings'>('dashboard');

  const fetchUsers = async () => {
    try {
      const data = await fetchAllUsersArray(); // ✅ updated
      const updatedUsers = data.map((user: any) => ({
        ...user,
        status: user.isActive ? 'Active' : 'Inactive',
      }));
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const exportToExcel = () => {
    const exportData = users.map(user => ({
      Email: user.email,
      Role: user.role,
      Status: user.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    saveAs(blob, 'UserData.xlsx');
  };

  return (
    <div className="admin-panel-container">
      <Sidebar onSelectTab={setSelectedTab} />
      <main className="admin-panel-main-content">

        {selectedTab === 'dashboard' && (
          <>
            <div className="admin-panel-cards-row">
              <TopCards />
              <button className="export-btn" onClick={exportToExcel}>
                Export
              </button>
            </div>
            <h2 className="section-title">User Management</h2>
            <UsersTable users={users} setUsers={setUsers} />
          </>
        )}

        {selectedTab === 'users' && (
          <>
            <h2 className="section-title"> Users Data</h2>
            <Users />
          </>
        )}

        {selectedTab === 'settings' && (
          <>
            <h2 className="section-title">Settings</h2>
            <p>Settings page under construction.</p>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
