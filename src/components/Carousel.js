// Carousel.js
import React, { useEffect, useState } from 'react';
import { getImageFromSessionStorage } from "../js/processImage";
import { processImageWithOpenCV } from '../js/processOpenCV'; 
import {detectAreaImg} from '../js/detectArea';
//import {adjustContrastAndSharpness} from '../js/contrastShapes';

import ImageModal from '../js/ImageModal';

const Carousel = () => {
  const [hsvImage, setHsvImage] = useState(null);
  const [AreaImage, setAreaImage] = useState(null);
  const [contrastImage, setContrastImage] = useState(null);
  const [largeImage, setLargeImage] = useState(null);

  const croppedImage = getImageFromSessionStorage('croppedImage');
  const segmentedImage = getImageFromSessionStorage('segmentedImage');

  // Function để hiển thị ảnh lớn hơn
  const  showLargeImage = (imageUrl) => {
    setLargeImage(imageUrl);
  };

  // Function để đóng ảnh lớn hơn
  const closeLargeImage = () => {
    setLargeImage(null);
  };

  useEffect(() => {
    async function processImages() {
      if (window.cv && window.cv.imread && segmentedImage) {
        try {
          await detectAreaImg(segmentedImage);
          const areaImageData = getImageFromSessionStorage('detectAreaImage');
          setAreaImage(areaImageData);

          await processImageWithOpenCV(areaImageData);
          const hsvImageData = getImageFromSessionStorage('hsvImage');
          setHsvImage(hsvImageData);
          const contrastImageData = getImageFromSessionStorage('contrastShapesImage');
          setContrastImage(contrastImageData);
        } catch (error) {
          console.error("Error processing images:", error);
        }
      }
    }

    processImages();
  }, [segmentedImage]);

    return (
<div className="flex justify-start items-center space-x-4 overflow-x-auto max-w-screen-sm mx-auto pl-4 p-4">
  {/* Add padding-left (pl-4) to the container to ensure the first image is not obscured */}
  
  <img
    src={croppedImage}
    alt="Cropped"
    className="w-auto h-[150px]"
    onClick={() => showLargeImage(croppedImage)}
  />
  <img
    src={segmentedImage}
    alt="Segmented"
    className="w-[150px] h-auto"
    onClick={() => showLargeImage(segmentedImage)}
  />
  {AreaImage && (
    <img
      src={AreaImage}
      alt="Area Image"
      className="w-[150px] h-auto"
      onClick={() => showLargeImage(AreaImage)}
    />
  )}
  {contrastImage && (
    <img
      src={contrastImage}
      alt="Contrast Image"
      className="w-[150px] h-auto"
      onClick={() => showLargeImage(contrastImage)}
    />
  )}
  {hsvImage && (
    <img
      src={hsvImage}
      alt="HSV Image"
      className="w-[150px] h-auto"
      onClick={() => showLargeImage(hsvImage)}
    />
  )}
  {/* Hiển thị ảnh lớn hơn nếu có */}
  {largeImage && <ImageModal imageUrl={largeImage} onClose={closeLargeImage} />}
</div>

      );
    };
    
    export default Carousel;
    