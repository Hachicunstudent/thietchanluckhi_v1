import React, { useRef, useState } from 'react';
import Croppie from 'croppie';
import 'croppie/croppie.css';

const UploadAndCrop = () => {
    const [imageSrc, setImageSrc] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const croppieRef = useRef(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                setImageSrc(e.target.result);
                if (!croppieRef.current) {
                    croppieRef.current = new Croppie(document.getElementById('croppie-container'), {
                        viewport: { width: 200, height: 200, type: 'square' },
                        boundary: { width: 300, height: 300 },
                        enableResize: true
                    });
                }
                croppieRef.current.bind({
                    url: e.target.result
                });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleCrop = () => {
      croppieRef.current.result({
          type: 'base64',
          size: 'original', // Điều này sẽ giữ nguyên kích thước gốc của ảnh
          format: 'jpeg', // Bạn có thể chọn 'png', 'jpeg', 'webp'
          quality: 1 // Điều chỉnh chất lượng từ 0 đến 1
      }).then((croppedImg) => {
          setCroppedImage(croppedImg);
          sessionStorage.setItem('croppedImage', croppedImg);
          console.log('Image saved to sessionStorage with original size');
      });
  };
  
    return (
        <div className="p-4 max-w-sm mx-auto">
            <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange} 
                className="block w-full text-sm py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
            />
            <div 
                id="croppie-container" 
            ></div>
<div className="flex justify-center">
    <button 
        onClick={handleCrop} 
        disabled={!imageSrc}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        style={{ minWidth: '170px' }}
    >
        Cắt ảnh
    </button>
</div>

            {croppedImage && (
    <div className="flex justify-center mt-4">
        <img 
            src={croppedImage} 
            alt="Cropped" 
            className="block rounded-md shadow-lg object-cover"
            style={{ width: '300px', height: 'auto' }}
        />
    </div>
)}
        </div>
    );
};

export default UploadAndCrop;
