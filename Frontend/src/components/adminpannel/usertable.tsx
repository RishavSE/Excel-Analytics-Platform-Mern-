import React, { useEffect, useState } from 'react';
import './adminpannel.css';
import { getAllUsers, deleteUser } from '../../api/api';

type User = {
  _id: string;
  email: string;
  role: 'admin' | 'user';
  isActive?: boolean; // <-- Use backend's isActive field
};

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = () => {
    getAllUsers()
      .then(res => {
        const updatedUsers = res.data.map((user: any) => ({
          ...user,
          isActive: user.isActive, // coming from backend
        }));
        setUsers(updatedUsers);
      })
      .catch(err => console.error('Failed to fetch users:', err));
  };

  useEffect(() => {
    fetchUsers(); // on mount
  }, []);

  const handleDelete = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        fetchUsers();
      } catch (error) {
        console.error('❌ Failed to delete user:', error);
        alert('Delete failed. Try again.');
      }
    }
  };

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>
                <span className={`role-badge role-${user.role.toLowerCase()}`}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </td>
              <td>
                <span className={user.isActive ? 'status-active' : 'status-inactive'}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(user._id)}>
                  Delete User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
