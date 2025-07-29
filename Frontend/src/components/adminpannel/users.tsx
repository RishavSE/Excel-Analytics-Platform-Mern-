import React, { useEffect, useState } from "react";
import { fetchAllUsersArray } from "../../api/api"; // use the fixed function
import "./adminpannel.css";

type User = {
  _id: string;
  name?: string;
  email: string;
  role: string;
  uploads: number;
  lastLogin?: string;
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllUsersArray()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
        setError("Failed to fetch users.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="users-loading">⏳ Loading users...</p>;
  if (error) return <p className="users-error">❌ {error}</p>;

  return (
    <div className="users-section-dark">
      <h2 className="users-title">👥 All Registered Users</h2>
      {users.length === 0 ? (
        <p className="users-empty">No users found.</p>
      ) : (
        <div className="users-grid">
          {users.map((u) => (
            <div key={u._id} className="user-card">
              {/* <p><strong>Name:</strong> {u.name || "—"}</p> */}
              <p><strong>Email:</strong> {u.email}</p>
              <p><strong>Role:</strong> <span className={`role-${u.role}`}>{u.role}</span></p>
              <p><strong>Uploads:</strong> {u.uploads ?? 0}</p>
              <p><strong>Last Login:</strong> {u.lastLogin ? new Date(u.lastLogin).toLocaleString() : "Never"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
