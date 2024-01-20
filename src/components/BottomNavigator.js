import React from 'react';
import { useNavigate } from 'react-router-dom';

// Giả sử exportPDF và exportImage đã được import từ các file tương ứng
import { exportPDF, exportImage } from '../js/exportPDF';

const BottomNavigator = () => {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate('/upload');
  };

  return (
    <div className="fixed inset-x-0 bottom-0 bg-blue-600 shadow-lg">
      <div className="flex justify-center items-center max-w-md mx-auto py-3 space-x-12"> {/* Đã sửa ở đây */}
        <button
          className="flex flex-col items-center text-white"
          onClick={() => exportImage('png')}
        >
          <span className="material-icons">image</span>
          <span className="text-xs">Tải ảnh</span>
        </button>

        <button
          className="flex flex-col items-center text-white"
          onClick={handleUploadClick}
        >
          <span className="material-icons">add</span>
          <span className="text-xs">Bệnh nhân mới</span>
        </button>

        <button
          className="flex flex-col items-center text-white"
          onClick={() => exportPDF()}
        >
          <span className="material-icons">picture_as_pdf</span>
          <span className="text-xs">Tải PDF</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNavigator;
