import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Modal from 'react-modal';
import { auth } from '../firebase';
import { saveDataToFirestore } from '../js/saveToFirestore';
import { uploadImageFromSessionStorage } from '../js/uploadImageFromSessionStorage';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
//import 'antd/dist/antd.css'; // Import Ant Design styles


import 'react-tabs/style/react-tabs.css';


Modal.setAppElement('#root');

const TabComponent = ({ jsonData }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [innerTabIndex, setInnerTabIndex] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [userEmail, setUserEmail] = useState('');
  const [structuredData] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái isLoading




  useEffect(() => {
    if (auth.currentUser) {
      setUserEmail(auth.currentUser.email);
    }

    // Lấy thông tin bệnh nhân từ sessionStorage
    const patientInfo = JSON.parse(sessionStorage.getItem('patientInfo') || '{}');

    // Thêm thông tin bệnh nhân vào structuredData
    structuredData.patientInfor = patientInfo;

  }, []);

  const openModal = (content) => {
    setModalContent(content);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onSubmit = async (formData) => {
    setIsLoading(true); // Bắt đầu hiển thị loading indicator
    console.log('Form data:', formData);
  
    // Lặp qua formData để tổ chức dữ liệu
    for (const questionKey in formData) {
      if (questionKey.includes('_')) {
        // Xử lý dữ liệu từ các tab khác
        const [keyCap1, keyCap2] = questionKey.split('_');
        if (!structuredData[keyCap1]) {
          structuredData[keyCap1] = {};
        }
        structuredData[keyCap1][keyCap2] = formData[questionKey];
      }
    }
  
    // Xử lý dữ liệu tại đây...
    console.log("Structured Data:", structuredData);  
    if (!userEmail) {
      alert('Không xác định được người dùng.');
      return;
    }
  
    try {
      // Upload ảnh lên Firebase và lấy URL
      const imageUrl = await uploadImageFromSessionStorage("croppedImage");
      console.log('Image URL:', imageUrl);
  
      // Thêm URL của ảnh vào structuredData
      structuredData.imgUrl = imageUrl;
      console.log('Structured data:', structuredData);  
      // Lưu trữ dữ liệu vào Firestore
      const result = await saveDataToFirestore(userEmail, structuredData);
      console.log('Result:', result);
      if (result) {
        setIsLoading(false); // Tắt loading indicator khi hoàn tất
        navigate('/result'); // Điều hướng đến trang /result
      } else {
        setIsLoading(false); // Tắt loading indicator nếu có lỗi
        alert('Lỗi khi lưu dữ liệu.');
      }
    } catch (error) {
      setIsLoading(false); // Tắt loading indicator nếu có lỗi
      console.error('Error uploading image and saving data to Firestore:', error);
      alert('Lỗi khi tải ảnh lên và lưu dữ liệu.');
    }
  };
  



  const renderQuestion = (keyCap2Data, questionKey) => {
    const questionType = keyCap2Data.type;
    const validChoices = Object.entries(keyCap2Data["đặc tính"])
                              .filter(([_, value]) => value["chẩn đoán"] !== null);

    return (
      <div>
  {validChoices.map(([choice, value]) => (
    <label key={choice} className="block mt-4 text-xl cursor-pointer" onClick={(e) => {
      if (e.target.type !== 'radio' && e.target.type !== 'checkbox') {
        openModal(value);
      }
    }}>
      <input 
        type={questionType} 
        name={questionKey} 
        value={choice} 
        className="form-checkbox form-radio text-blue-500 h-8 w-8 mr-2" // Adjust size and color here
        {...register(questionKey)}
      />
      <span className="align-middle">{choice}</span> {/* Text size is controlled by text-lg */}
    </label>
  ))}
</div>

    );
  };

  return (
    
    <div>
          <div>
      {/* Overlay và Spinner */}
      {isLoading && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
  <div className="bg-white p-6 rounded-lg shadow-xl text-center">
    <p className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Hệ thống đang tính toán và chẩn đoán bệnh. Vui lòng đợi!!</p>
    <Spin size="large" />
  </div>
</div>

      )}

      {/* Các thành phần khác của component */}
    </div>

<form onSubmit={handleSubmit(onSubmit)} className="p-4">
<Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)} className="mb-4">
  <TabList className="mb-2 flex flex-wrap gap-2 p-1 bg-blue-900/20 rounded-xl">
    {Object.keys(jsonData).map(keyCap1 => (
      <Tab 
        key={keyCap1} 
        className={`px-4 py-4 text-xl font-medium rounded-lg cursor-pointer focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60 hover:bg-blue-100 ${
          tabIndex === keyCap1 ? 'bg-blue-700 text-white shadow-3xl' : 'bg-white text-blue-700'
        }`}
      >
        {keyCap1}
      </Tab>
    ))}
  </TabList>

  {Object.keys(jsonData).map((keyCap1) => (
    <TabPanel key={keyCap1} className="bg-white rounded-lg shadow mb-4">
      <Tabs selectedIndex={innerTabIndex} onSelect={innerIndex => setInnerTabIndex(innerIndex)}>
        <TabList className="flex space-x-1 p-1 bg-blue-700/20 rounded-xl">
          {Object.keys(jsonData[keyCap1]).filter(keyCap2 => jsonData[keyCap1][keyCap2].type !== "No").map(keyCap2 => (
            <Tab 
              key={keyCap2} 
              className={`px-4 py-3 text-xl font-medium rounded-lg cursor-pointer focus:outline-none focus:ring-2 ring-offset-2 ring-white ring-opacity-50 hover:bg-green-200 ${
                innerTabIndex === keyCap2 ? 'bg-green-600 text-white shadow-xl' : 'bg-blue-200 text-green-900'
              }`}
            >
              {keyCap2}
            </Tab>
          ))}
        </TabList>

        {Object.keys(jsonData[keyCap1]).filter(keyCap2 => jsonData[keyCap1][keyCap2].type !== "No").map((keyCap2) => (
          <TabPanel key={keyCap2} className="border border-gray-200 rounded-lg mb-2">
            {renderQuestion(jsonData[keyCap1][keyCap2], `${keyCap1}_${keyCap2}`)}
          </TabPanel>
        ))}
      </Tabs>
    </TabPanel>
  ))}
</Tabs>

  <button type="submit" className="absolute bottom-4 right-4 px-6 py-2 mt-4 mr-4 my-4 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">    Gửi
  </button>
</form>

<Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Chi Tiết Lựa Chọn" className="outline-none">
  <div className="bg-white rounded-lg p-6">
    <h2 className="text-2xl font-semibold mb-4">{modalContent["mô tả"]}</h2>
    <img src={modalContent["hình ảnh"]} alt="Mô tả" className="max-h-[66vh] mb-4" />
        <button onClick={closeModal} className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 focus:outline-none">
      Đóng
    </button>
  </div>
</Modal>
    </div>
  );
};

export default TabComponent;
