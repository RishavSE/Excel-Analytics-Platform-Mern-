import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import "./App.css";

interface UploadFile {
  _id: string; 
  filename: string;
  rows: number;
  date: string;
  data: any[];
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [recentUploads, setRecentUploads] = useState<UploadFile[]>([]);
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const res = await API.get(`/uploads?email=${email}`);
        setRecentUploads(res.data);
      } catch (error) {
        console.error("❌ Failed to fetch uploads:", error);
      }
    };

    if (email) fetchUploads();
  }, [email]);

  const handleParseAndChart = (file: UploadFile) => {
    if (!file?.data || !Array.isArray(file.data)) {
      alert("The selected file has no valid data. Please re-upload.");
      return;
    }

    try {
      localStorage.setItem("excelData", JSON.stringify(file.data));
      navigate("/user-dashboard/chart-builder");
    } catch (error) {
      console.error("❌ Failed to store excel data:", error);
      alert("Something went wrong while preparing chart data.");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("🗑️ Are you sure you want to delete this upload?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/uploads/${id}`);
      setRecentUploads(prev => prev.filter(file => file._id !== id));
    } catch (error) {
      console.error("❌ Failed to delete upload:", error);
      alert("Could not delete upload. Please try again.");
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>📂 Dashboard</h1>
      </div>

      <div className="uploads">
        <h3>Recent Uploads</h3>

        {recentUploads.length === 0 ? (
          <p>No uploads yet. Please upload an Excel file.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Filename</th>
                <th>Rows</th>
                <th>Upload Date</th>
                <th  style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentUploads.map((file, index) => (
                <tr key={file._id}>
                  <td>{file.filename}</td>
                  <td>{file.rows}</td>
                  <td>{new Date(file.date).toLocaleString()}</td>
                 <td style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
  <button className="chart-btn" onClick={() => handleParseAndChart(file)}>
    📊 Chart(Analyse)
  </button>
  <button className="delete-btn" onClick={() => handleDelete(file._id)}>
    🗑️ Delete
  </button>
</td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
