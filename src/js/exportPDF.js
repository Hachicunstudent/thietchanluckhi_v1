//exportPDF.js
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const exportPDF = () => {
  const input = document.getElementById('result'); // Đảm bảo rằng bạn có một element với id='result'

  html2canvas(input)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save("download.pdf"); // Tên file PDF
    });
};


const exportImage = (imageFormat = 'png') => {
  const input = document.getElementById('result'); // Đảm bảo rằng bạn có một element với id='result'

  html2canvas(input)
    .then((canvas) => {
      // Tạo URL cho ảnh
      let imageURL;
      if (imageFormat === 'jpeg') {
        imageURL = canvas.toDataURL('image/jpeg');
      } else {
        imageURL = canvas.toDataURL('image/png'); // Mặc định là PNG
      }

      // Tạo một thẻ link tạm thời để tải xuống ảnh
      let downloadLink = document.createElement('a');
      downloadLink.href = imageURL;
      downloadLink.download = `download.${imageFormat === 'jpeg' ? 'jpg' : 'png'}`; // Đảm bảo rằng đuôi file phù hợp với định dạng ảnh
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
}

export { exportPDF, exportImage };
