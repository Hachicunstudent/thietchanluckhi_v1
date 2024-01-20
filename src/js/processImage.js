// processImage.js

// Hàm lấy hình ảnh từ Session Storage
export const getImageFromSessionStorage = (key) => {
    return sessionStorage.getItem(key);
};
