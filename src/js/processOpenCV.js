/* global cv */
// processOpenCV.js

export const processImageWithOpenCV = (segmentImageData) => {
    return new Promise((resolve, reject) => {
      if (!window.cv) {
        reject(new Error('OpenCV không sẵn sàng.'));
        return;
      }
  
      const image = new Image();
      image.src = segmentImageData;
      image.onload = () => {
        try {
          const src = cv.imread(image);
          const hsv = new cv.Mat();
          cv.cvtColor(src, hsv, cv.COLOR_RGB2HSV);
  
          // Tách các kênh H, S, V
          let channels = new cv.MatVector();
          cv.split(hsv, channels);
          let h = channels.get(0);
          let s = channels.get(1);
          let v = channels.get(2);
  
          // Tạo một MatVector mới để chứa h, s, v
          let mergedChannels = new cv.MatVector();
          mergedChannels.push_back(h);
          mergedChannels.push_back(s);
          mergedChannels.push_back(v);
  
          // Kết hợp lại thành một ảnh HSV mới
          let mergedHSV = new cv.Mat();
          cv.merge(mergedChannels, mergedHSV);
  
          // Hiển thị và chuyển đổi hình ảnh HSV thành dạng base64
          const canvas = document.createElement('canvas');
          cv.imshow(canvas, mergedHSV);
          const hsvImageData = canvas.toDataURL('image/png');
          sessionStorage.setItem('hsvImage', hsvImageData);
  
          // Tạo contrast và sharpness cho segmentImageData
          let contrast = new cv.Mat();
          cv.convertScaleAbs(src, contrast, 1.2, 0); // Tăng độ tương phản
  
          let blurred = new cv.Mat();
          cv.GaussianBlur(contrast, blurred, new cv.Size(5, 5), 0);
          let sharp = new cv.Mat();
          cv.addWeighted(contrast, 1.2, blurred, -0.2, 0, sharp); // Tăng độ sắc nét
  
          // Hiển thị và chuyển đổi hình ảnh contrast và sharpness thành dạng base64
          cv.imshow(canvas, sharp);
          const contrastShapesImage = canvas.toDataURL('image/png');
          sessionStorage.setItem('contrastShapesImage', contrastShapesImage);
  
          // Giải phóng bộ nhớ
          src.delete();
          hsv.delete();
          h.delete();
          s.delete();
          v.delete();
          mergedHSV.delete();
          channels.delete();
          mergedChannels.delete();
          contrast.delete();
          blurred.delete();
          sharp.delete();
  
          resolve({ hsvImageData, contrastShapesImage }); // Trả về hình ảnh đã xử lý
        } catch (error) {
          reject(error); // Trả về lỗi nếu có vấn đề trong quá trình xử lý
        }
      };
      image.onerror = () => {
        reject(new Error('Lỗi khi tải hình ảnh.'));
      };
    });
  };
  