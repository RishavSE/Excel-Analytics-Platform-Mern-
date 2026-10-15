
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sideb";
import Dashboard from "./Dashboard";
import UploadPage from "./UploadPage";
import ChartBuilder from "./ChartBuider";
import Setting from "./Setting";

const Alayout = () => {
  return (
    <div className="user-dashboard-layout">
      <Sidebar />
      <main className="user-dashboard-content">
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="home" element={<Dashboard />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="chart-builder" element={<ChartBuilder />} />
          <Route path="settings" element={<Setting />} />
        </Routes>
      </main>
    </div>
  );
};

export default Alayout;
