import React from 'react';

const ImageModal = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-content bg-white rounded-lg p-4 max-w-md mx-4 my-8">
        <img src={imageUrl} alt="Large Image" className="max-w-full max-h-96" />
        <div className="text-center mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
