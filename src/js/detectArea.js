/* global cv */
// detectArea.js
export const detectAreaImg = (croppedImageData, callback) => {
    if (!window.cv) {
        console.error('OpenCV không sẵn sàng.');
        return;
    }
    const image = new Image();
    image.src = croppedImageData;
    image.onload = () => {
        let src = cv.imread(image);
        let height = src.rows;
        let width = src.cols;
        console.log('width: ', width, ' height: ', height);
    
        let threshold = 30;
        let point = [];
        let temp = [];
        let flag1 = false, flag2 = false, flag3 = false, flag4 = false;
        let center_width = 0;
        let part1_height = 0;
        let part2_height = 0;
    
        // Function to get pixel values
        function getPixelValue(image, x, y) {
            let pixel = image.ucharPtr(y, x);
            let B = pixel[0];
            let G = pixel[1];
            let R = pixel[2];
            return [B, G, R];
        }
    
            // Find point 1 - first loop
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                let [B, G, R] = getPixelValue(src, j, i);
                if (B + G + R > threshold && j < width / 2) {
                    flag1 = true;
                    temp.push([j, i]);
                    break;
                }
            }
            if (flag1) break;
        }
    
        // Find point 1 - second loop
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                let [B, G, R] = getPixelValue(src, i, j);
                if (B + G + R > threshold) {
                    flag2 = true;
                    temp.push([i, j]);
                    break;
                }
            }
            if (flag2) break;
        }
    
        // Final calculation for point 1
        let i = temp[1][0];
        let j = temp[0][1];
        while (true) {
            let [B, G, R] = getPixelValue(src, i, j);
            if (B + G + R > threshold) {
                point.push([i, j]);
                break;
            }
            i += 1;
            j += 1;
        }
    
        temp = [];
    
    // Find point 2 - first loop
    for (let i = 0; i < height; i++) {
        for (let j = width - 1; j >= 0; j--) {
            let [B, G, R] = getPixelValue(src, j, i);
            if (B + G + R > threshold && j > width / 2) {
                flag3 = true;
                temp.push([j, i]);
                break;
            }
        }
        if (flag3) break;
    }
    
    // Find point 2 - second loop
    for (let i = width - 1; i >= 0; i--) {
        for (let j = 0; j < height; j++) {
            let [B, G, R] = getPixelValue(src, i, j);
            if (B + G + R > threshold) {
                flag4 = true;
                temp.push([i, j]);
                break;
            }
        }
        if (flag4) break;
    }
    
    // Final calculation for point 2
    i = temp[1][0];
    j = temp[0][1];
    while (true) {
        let [B, G, R] = getPixelValue(src, i, j);
        if (B + G + R > threshold) {
            point.push([i, j]);
            break;
        }
        i -= 1;
        j += 1;
    }
    
    // Calculate center width and reset flags
    center_width = Math.floor((point[0][0] + point[1][0]) / 2);
    flag1 = flag2 = flag3 = flag4 = false;
    
    // Find point 3
    for (let i = 0; i < height; i++) {
        let [B, G, R] = getPixelValue(src, center_width, i);
        if (B + G + R > threshold) {
            point.push([center_width, i]);
            break;
        }
    }
    
    // Find point 4
    for (let i = height - 1; i >= 0; i--) {
        let [B, G, R] = getPixelValue(src, center_width, i);
        if (B + G + R > threshold) {
            point.push([center_width, i]);
            break;
        }
    }
    
    // Calculate various heights
     part1_height = Math.floor((point[3][1] - point[2][1]) / 3) + point[2][1];
     part2_height = Math.floor((point[3][1] - point[2][1]) / 3 * 2) + point[2][1];
    let part3_height = Math.floor((part2_height + part1_height) / 2);
    let part4_height = (part3_height - part1_height) + part2_height;
    let part5_height = Math.floor((part3_height - part1_height) / 2) + part4_height;
        
    // Find point 5
    for (let i = 0; i < width; i++) {
        let [B, G, R] = getPixelValue(src, i, part1_height);
        if (B + G + R > threshold) {
            point.push([i, part1_height]);
            break;
        }
    }
    
    // Find point 6
    for (let i = width - 1; i >= 0; i--) {
        let [B, G, R] = getPixelValue(src, i, part1_height);
        if (B + G + R > threshold) {
            point.push([i, part1_height]);
            break;
        }
    }
    
    // Find point 7
    for (let i = 0; i < width; i++) {
        let [B, G, R] = getPixelValue(src, i, part3_height);
        if (B + G + R > threshold) {
            point.push([i, part3_height]);
            break;
        }
    }
    
    // Find point 8
    for (let i = width - 1; i >= 0; i--) {
        let [B, G, R] = getPixelValue(src, i, part3_height);
        if (B + G + R > threshold) {
            point.push([i, part3_height]);
            break;
        }
    }
    
    // Find point 9
    for (let i = 0; i < width; i++) {
        let [B, G, R] = getPixelValue(src, i, part2_height);
        if (B + G + R > threshold) {
            point.push([i, part2_height]);
            break;
        }
    }
    
    // Find point 10
    for (let i = width - 1; i >= 0; i--) {
        let [B, G, R] = getPixelValue(src, i, part2_height);
        if (B + G + R > threshold) {
            point.push([i, part2_height]);
            break;
        }
    }
    
    // Find point 11
    for (let i = 0; i < width; i++) {
        let [B, G, R] = getPixelValue(src, i, part4_height);
        if (B + G + R > threshold) {
            point.push([i, part4_height]);
            break;
        }
    }
    
    // Find point 12
    for (let i = width - 1; i >= 0; i--) {
        let [B, G, R] = getPixelValue(src, i, part4_height);
        if (B + G + R > threshold) {
            point.push([i, part4_height]);
            break;
        }
    }
    
    // Find point 13
    for (let i = 0; i < width; i++) {
        let [B, G, R] = getPixelValue(src, i, part5_height);
        if (B + G + R > threshold) {
            point.push([i, part5_height]);
            break;
        }
    }
    
    // Find point 14
    for (let i = width - 1; i >= 0; i--) {
        let [B, G, R] = getPixelValue(src, i, part5_height);
        if (B + G + R > threshold) {
            point.push([i, part5_height]);
            break;
        }
    }
      
    // Drawing circles and lines
    point.forEach((pnt, i) => {
        let val = (i + 1) % 2 === 0 ? pnt[0] - 20 : pnt[0];
    
        // Uncomment the following lines if you need to draw text. OpenCV.js does not support cv.putText directly.
        // Draw text using canvas context if needed.
    
        let center = new cv.Point(pnt[0], pnt[1]);
        cv.circle(src, center, 2, [255, 255, 255, 255], 4); // Draw circle
    });
    
    // Draw line between points 5 and 6
    cv.line(src, new cv.Point(point[4][0], point[4][1]), new cv.Point(point[5][0], point[5][1]), [255, 255, 255, 255], 2);
    
    // Calculate center point
    let center_point = new cv.Point(
        Math.floor((point[0][0] + point[1][0] + point[3][0]) / 3),
        Math.floor((point[0][1] + point[1][1] + point[3][1]) / 3)
    );
    cv.circle(src, center_point, 2, [255, 255, 255, 255], 4); // Draw center circle
    
    // Calculate inside points
    let inside_point = [];
    let point_list = [6, 7, 8, 9, 10, 11, 12, 13, 3];
    let length = (point[5][0] - point[4][0]) * 0.15;
    
    inside_point.push([Math.floor(point[4][0] + length), point[4][1]]);
    inside_point.push([Math.floor(point[5][0] - length), point[5][1]]);
    
    point_list.forEach(i => {
        let long_length = Math.sqrt(Math.pow(center_point.x - point[i][0], 2) + Math.pow(center_point.y - point[i][1], 2));
        let rate = length / long_length;
        inside_point.push([
            Math.floor((center_point.x - point[i][0]) * rate + point[i][0]),
            Math.floor((center_point.y - point[i][1]) * rate + point[i][1])
        ]);
    });
    
    // Draw polyline
    // Sắp xếp lại các điểm theo thứ tự mong muốn
    let orderedPoints = [
        inside_point[0], inside_point[2], inside_point[4],
        inside_point[6], inside_point[8], inside_point[inside_point.length - 1],
        inside_point[9], inside_point[7], inside_point[5],
        inside_point[3], inside_point[1]
    ];
    
    // Tạo một Mat mới từ mảng điểm đã sắp xếp
    let matOfOrderedPoints = cv.matFromArray(orderedPoints.length, 1, cv.CV_32SC2, [].concat(...orderedPoints));
    
    // Tạo một MatVector và thêm Mat vào đó
    let matVector = new cv.MatVector();
    matVector.push_back(matOfOrderedPoints);
    
    // Sử dụng MatVector trong hàm polylines
    cv.polylines(src, matVector, true, [255, 255, 255, 255], 2);
    
    // Xóa bỏ Mat và MatVector để giải phóng bộ nhớ
    matOfOrderedPoints.delete();
    matVector.delete();
    
    
    // Ghi chú: Đoạn mã này giả định rằng `src` và `inside_point` đã được định nghĩa và khởi tạo đúng cách trước đó.
    
    // Draw additional lines
    cv.line(src, new cv.Point(point[10][0], point[10][1]), new cv.Point(inside_point[6][0], inside_point[6][1]), [255, 255, 255, 255], 2);
    cv.line(src, new cv.Point(point[11][0], point[11][1]), new cv.Point(inside_point[7][0], inside_point[7][1]), [255, 255, 255, 255], 2);
    
    // Hiển thị và chuyển đổi hình ảnh thành dạng base64
    const canvas = document.createElement('canvas');
    cv.imshow(canvas, src);
    const detectAreaImageData = canvas.toDataURL('image/png');
    sessionStorage.setItem('detectAreaImage', detectAreaImageData);
    // Giải phóng bộ nhớ
    src.delete();

    if (callback && typeof callback === 'function') {
        callback();
    }



};
image.onerror = () => {
    console.error('Lỗi khi tải hình ảnh.');
}};
