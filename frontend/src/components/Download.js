import React, { useState } from 'react';
import axios from 'axios';
import "../css/Download.css";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const DownloadDatabaseButton = () => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/download-store-DB`, { responseType: 'blob' });

      const blob = new Blob([response.data], { type: 'text/plain' });

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'store_database.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading database:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="centeredDiv">
        <button onClick={handleDownload} disabled={loading}>
          {loading ? 'Downloading...' : 'Download Database'}
        </button>
      </div>
    </>
  );
  
};

export default DownloadDatabaseButton;
