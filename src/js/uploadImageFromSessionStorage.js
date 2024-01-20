import { storage } from '../firebase'; // Đảm bảo bạn đã cấu hình Firebase Storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export const uploadImageFromSessionStorage = async (imgName) => {
  try {
    // Lấy dữ liệu ảnh từ sessionStorage
    const imageData = sessionStorage.getItem(imgName);
    if (!imageData) {
      throw new Error('Không có dữ liệu ảnh.');
    }

    // Chuyển đổi dữ liệu ảnh từ base64 sang Blob
    const response = await fetch(imageData);
    const blob = await response.blob();

    // Sinh UUID để tạo tên file duy nhất
    const uniqueFileName = uuidv4() + '-' + imgName;

    // Tạo reference đến nơi bạn muốn lưu ảnh trong Firebase Storage
    const imageRef = ref(storage, `images/${uniqueFileName}`);

    // Upload ảnh lên Firebase Storage
    await uploadBytes(imageRef, blob);

    // Lấy URL của ảnh đã upload
    const downloadURL = await getDownloadURL(imageRef);
    console.log('File available at', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('Lỗi khi upload ảnh từ sessionStorage:', error);
    throw error;
  }
};
