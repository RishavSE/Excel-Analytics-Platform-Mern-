import React, { useEffect, useState } from "react";
import axios from "axios";
import "./adminpannel.css";

type Account = {
  name: string;
  email: string;
  role: "Admin" | "User";
};

const UserAccountsTable: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users") // ✅ Must match backend
      .then((res) => {
        console.log("✅ Users fetched:", res.data);
        setAccounts(res.data);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch users:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="table-container">
      <h2>All User Accounts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              {/* <th>NAME</th> */}
              <th>EMAIL</th>
              <th>ROLE</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((a, i) => (
              <tr key={i}>
                {/* <td>{a.name}</td> */}
                <td>{a.email}</td>
                <td>
                  <span className={`role-badge role-${a.role.toLowerCase()}`}>
                    {a.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserAccountsTable;
