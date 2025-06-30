import React, { useEffect, useState } from 'react';
import { FaArrowUp, FaChartLine } from 'react-icons/fa';
import { SiStripe } from 'react-icons/si';
import './adminpannel.css';
import { getUserStats, getUploadCount } from '../../api/api';

const TopCards: React.FC = () => {
  const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0 });
  const [uploadCount, setUploadCount] = useState(0);

  useEffect(() => {
    // Fetch user stats
    getUserStats()
      .then(res => {
        setStats(res.data);
      })
      .catch(err => console.error('Failed to load user stats:', err));

    // Fetch upload count
    getUploadCount()
      .then(res => {
        setUploadCount(res.data.count); // assumes { count: number }
      })
      .catch(err => console.error('Failed to load upload count:', err));
  }, []);

  return (
    <div className="top-cards">
      <div className="top-card">
        <div className="top-card-icon arrow"><FaArrowUp /></div>
        <div>
          <div className="top-card-value">{stats.totalUsers}</div>
          <div className="top-card-label">Total Users</div>
        </div>
      </div>
      <div className="top-card">
        <div className="top-card-icon chart"><FaChartLine /></div>
        <div>
          <div className="top-card-value">{stats.activeUsers}</div>
          <div className="top-card-label">Active Users</div>
        </div>
      </div>
      <div className="top-card">
        <div className="top-card-icon stripe"><SiStripe /></div>
        <div>
          <div className="top-card-value">{uploadCount}</div>
          <div className="top-card-label">Total Uploads</div>
        </div>
      </div>
    </div>
  );
};

export default TopCards;
