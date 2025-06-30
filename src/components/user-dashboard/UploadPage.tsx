import React, { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaFileExcel } from "react-icons/fa";

const UploadPage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const handleClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("email", localStorage.getItem("email") || "");

  try {
    const res = await axios.post("http://localhost:5000/api/upload", formData);

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
    <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", backgroundColor: "#f9f9f9" }}>
      <div
        onClick={handleClick}
        style={{
          width: "350px",
          height: "300px",
          backgroundColor: "#fff",
          border: "2px dashed #007bff",
          borderRadius: "12px",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          transition: "0.3s",
        }}
      >
        <FaFileExcel size={64} color="#28a745" />
        <h3 style={{ marginTop: "1rem", color: "#333" }}>Click to upload Excel</h3>
        <p style={{ fontSize: "0.9rem", color: "#777" }}>Supports .xlsx & .xls files</p>
        <input
          type="file"
          accept=".xlsx,.xls"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default UploadPage;
