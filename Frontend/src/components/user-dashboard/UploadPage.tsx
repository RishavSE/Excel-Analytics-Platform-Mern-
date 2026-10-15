import React, { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaFileExcel } from "react-icons/fa";

// ✅ Base URL - auto switch between local and hosted
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://excel-analytics-platform-mern.onrender.com";

const UploadPage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", localStorage.getItem("email") || "");

    try {
      const res = await axios.post(`${API_BASE_URL}/api/upload`, formData);

      const newFileData = {
        filename: file.name,
        rows: res.data.rows,
        date: new Date().toLocaleString(),
        data: res.data.data,
      };

      const previousUploads = JSON.parse(localStorage.getItem("recentUploads") || "[]");
      localStorage.setItem("recentUploads", JSON.stringify([newFileData, ...previousUploads]));

      toast.success("✅ File uploaded successfully!");

      setTimeout(() => navigate("/user-dashboard/home"), 1500);
    } catch (error) {
      console.error("❌ Upload failed:", error);
      toast.error("❌ Upload failed. Please try again.");
    }
  };

  return (
    <section className="upload-page">
      <div className="upload-card" onClick={handleClick}>
        <FaFileExcel size={64} color="#28a745" />
        <h3>Click to upload Excel</h3>
        <p>Supports .xlsx &amp; .xls files</p>
        <input
          type="file"
          accept=".xlsx,.xls"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>
      <ToastContainer position="top-center" />
    </section>
  );
};

export default UploadPage;
