/* global cv */
// processOpenCV.js

export const processImageWithOpenCV = (segmentImageData, callback) => {
    if (!window.cv) {
        console.error('OpenCV không sẵn sàng.');
        return;
    }

    const image = new Image();
    image.src = segmentImageData;
    image.onload = () => {
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

        // Kết hợp lại thành một ảnh RGB mới
        let merged = new cv.Mat();
        cv.merge(mergedChannels, merged);

        // Hiển thị và chuyển đổi hình ảnh thành dạng base64
        const canvas = document.createElement('canvas');
        cv.imshow(canvas, merged);
        const hsvImageData = canvas.toDataURL('image/png');
        sessionStorage.setItem('hsvImage', hsvImageData);

        // Giải phóng bộ nhớ
        src.delete();
        hsv.delete();
        h.delete();
        s.delete();
        v.delete();
        merged.delete();
        channels.delete();
        mergedChannels.delete();

        if (callback && typeof callback === 'function') {
            callback();
        }
    };
    image.onerror = () => {
        console.error('Lỗi khi tải hình ảnh.');
    };
};
