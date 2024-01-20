//IploadImageToFirebase.js
import  storage  from '../firebase'; // Đảm bảo bạn đã nhập Firebase Storage
import { ref as storageRef , uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const uploadImageToFirebase = async (imgName) => {
  try {
    // Lấy ảnh từ session store với tên imgName
    const imageData = sessionStorage.getItem(imgName);
    if (!imageData) {
      throw new Error('Không có dữ liệu ảnh.');
    }

    // Tạo một ID duy nhất cho file
    const uniqueFileName = `${uuidv4()}-${imgName}`;
    console.log(uniqueFileName);

    // Chuyển đổi dữ liệu ảnh sang Blob hoặc File (nếu lưu trữ dưới dạng base64 hoặc tương tự)
    const byteString = atob(imageData.split(',')[1]);
    const mimeString = imageData.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });

    // Tạo một reference đến Firebase Storage
    const imageRef = storageRef(storage,"abc.jpg");
    console.log(imageRef);

    // Upload ảnh lên Firebase Storage
    await uploadBytes(imageRef, blob);

    // Lấy URL của ảnh
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error('Error uploading image to Firebase:', error);
    throw error;
  }
};

export default uploadImageToFirebase;