import React, { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';



const Segment = () => {
    const [model, setModel] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Thêm state cho spinner
    const canvasRef = useRef(null);

    useEffect(() => {
        const loadModel = async () => {
            try {
                const loadedModel = await tf.loadGraphModel('js_seg_model/v4_2k_640x640/model.json');
                setModel(loadedModel);
            } catch (error) {
                console.error('Failed to load model', error);
            }
        };

        loadModel();
    }, []);

    

    const processImage = async () => {
        setIsLoading(true); // Bật spinner và thông báo khi bắt đầu xử lý


        const croppedImageData = sessionStorage.getItem('croppedImage');
        if (croppedImageData && model) {
            const croppedImage = new Image();
            croppedImage.src = croppedImageData;
            croppedImage.onload = async () => {
                const tensorImg = tf.browser.fromPixels(croppedImage)
                    .resizeNearestNeighbor([640, 640])
                    .expandDims();
                const predictions = await model.executeAsync(tensorImg);
                const predMask = predictions[0];
                visualizeSegmentation(tensorImg, predMask);
                setIsLoading(false); // Tắt spinner và thông báo khi xử lý xong

            };
        }
    };

    const visualizeSegmentation = (tensorImg, predMask) => {
        const binaryMask = createBinaryMask(predMask);
        const maskedImage = createMaskedImage(tensorImg, binaryMask);
        tf.browser.toPixels(maskedImage, canvasRef.current).then(() => {
            console.log("Masked image visualized on canvas.");
            saveSegmentedImage();
        }).catch(e => {
            console.error("Error visualizing masked image on canvas:", e);
        });
    };

    const createBinaryMask = (predMask) => {
        return tf.tidy(() => {
            return predMask.squeeze([0]).argMax(-1).expandDims(-1).cast('float32');
        });
    };

    const createMaskedImage = (tensorImg, binaryMask) => {
        return tf.tidy(() => {
            const mask3d = binaryMask.tile([1, 1, 3]);
            const maskedImage = tensorImg.mul(mask3d);
            return maskedImage.squeeze().div(255);
        });
    };

    const saveSegmentedImage = () => {
        if (canvasRef.current) {
            const segmentedImageData = canvasRef.current.toDataURL('image/png');
            sessionStorage.setItem('segmentedImage', segmentedImageData);
            console.log('Segmented image saved to Session Storage.');
        }
    };
    const navigate = useNavigate(); // Khai báo navigate ở đây

    const handleNextClick = () => {
        navigate('/infor');
    };


    return (
        
<div className="flex flex-col items-center">
<div>
      {/* Overlay và Spinner */}
      {isLoading && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
  <div className="bg-white p-6 rounded-lg shadow-xl text-center">
    <p className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Hệ thống đang tính toán và chẩn đoán bệnh. Vui lòng đợi!!</p>
    <Spin size="large" />
  </div>
</div>

      )}

      {/* Các thành phần khác của component */}
    </div>

    
  <button
    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
    onClick={processImage}
    style={{ minWidth: '170px' }} // Đặt chiều rộng tối thiểu cho nút

  >
    Segment Image
  </button>
  <div className="flex justify-center mt-4">
  <div className="overflow-hidden rounded-lg shadow-md" style={{ width: '300px', height: '300px' }}>
    <canvas
      ref={canvasRef}
      style={{ width: '300px', height: '300px' }}
    ></canvas>
  </div>
</div>

  <button
    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
    onClick={handleNextClick}
    style={{ minWidth: '170px' }} // Đặt chiều rộng tối thiểu cho nút

  >
    Tiếp
  </button>
</div>


    );
};

export default Segment;
