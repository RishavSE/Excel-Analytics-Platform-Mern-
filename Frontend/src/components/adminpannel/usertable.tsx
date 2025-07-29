import React from 'react';
import './adminpannel.css';
import { deleteUser } from '../../api/api';

type User = {
  _id: string;
  email: string;
  role: 'admin' | 'user';
  isActive?: boolean;
};

interface UsersTableProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, setUsers }) => {
  const handleDelete = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        // ✅ Update state locally instead of refetch
        setUsers(prev => prev.filter(user => user._id !== userId));
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
