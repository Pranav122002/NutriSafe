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
      <div className="centeredDiv ">
        <div className='p-10 bg-white shadow-md h-40 rounded-lg border-2'>
          <h1 className='text-3xl'>Download Data</h1>
          <button className='dsaasda w-[90%] mt-3 h-10 rounded-md shadow-md text-white ' onClick={handleDownload} disabled={loading}>
            {loading ? 'Downloading...' : 'Download Offline'}
          </button>
        </div>
      </div>
    </>
  );

};

export default DownloadDatabaseButton;
