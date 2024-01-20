import React from 'react';
import UploadandCrop from '../components/UploadandCrop';
import Segment from '../components/Segment';
import GuideModal from '../components/PhotoGuide'; // Thay thế 'path-to-PhotoGuide' bằng đường dẫn thực tế đến PhotoGuide.js

//import '../css/Upload.css';

const Upload = () => {
  return (
    <div className="upload-container">
      <h1 className="text-2xl font-bold text-center">Tải ảnh lên</h1>
      <GuideModal /> {/* Sử dụng Modal ở đây */}

      <div className="upload-crop-section">
        <UploadandCrop />
      </div>
      <div className="segment-section">
        <Segment />
      </div>
    </div>
  );
};

export default Upload;
