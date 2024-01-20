import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Modal } from 'antd'; // Import Modal from Ant Design
import gfm from 'remark-gfm';

const GuideModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    fetch('TakePhotoGuide.md')
      .then(response => response.text())
      .then(text => setMarkdown(text))
      .catch(error => console.error('Error loading the markdown file:', error));
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
<div className="flex justify-center items-center">
  <button 
    onClick={showModal} 
    className="text-center text-blue-500 underline"
  >
    Hướng dẫn sử dụng
  </button>
</div>

      <Modal
        title="Hướng dẫn sử dụng"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800} // Thiết lập chiều rộng modal theo ý muốn
      >
        <ReactMarkdown 
          remarkPlugins={[gfm]} 
          children={markdown} 
          components={{
            h1: ({node, ...props}) => <h1 style={{fontSize: '3em', fontWeight: 'bold'}} {...props} />, // Tùy chỉnh thẻ H1
            h2: ({node, ...props}) => <h2 style={{fontSize: '2em',fontWeight: 'bold'}} {...props} />, // Tùy chỉnh thẻ H2
            ul: ({node, ...props}) => <ul style={{listStyleType: 'circle', paddingLeft: '20px',fontSize: '1.5em'}} {...props} />, // Tùy chỉnh danh sách bullet
            p: ({node, ...props}) => <p style={{fontSize: '1.5em'}} {...props} />, // Tùy chỉnh văn bản thông thường
            // Thêm các thẻ khác nếu bạn muốn
          }}
        />
      </Modal>
    </>
  );
};

export default GuideModal;
