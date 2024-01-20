/* global Caman */

// contrastShapes.js

export const adjustContrastAndSharpness = (imageSrc, callback) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);

        // Sử dụng CamanJS để điều chỉnh hình ảnh
        Caman(canvas, function () {
            this.contrast(25);  // Tăng độ tương phản, giá trị có thể điều chỉnh
            this.sharpen(25);   // Tăng độ sắc nét, giá trị có thể điều chỉnh
            this.render(() => {
                // Gọi callback với dữ liệu ảnh đã xử lý
                const outputImage = canvas.toDataURL('image/png');

                // Lưu ảnh vào Session Storage
                sessionStorage.setItem('contrastShapesImage', outputImage);

                // Gọi callback nếu có
                if (callback) {
                    callback(outputImage);
                }
            });
        });
    };

    image.onerror = () => {
        console.error('Lỗi khi tải hình ảnh.');
    };
};
