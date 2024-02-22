// DisplayData.js

import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import processAndQueryData from '../js/utils'; // Import hàm xử lý dữ liệu từ file utils
import jsonData from '../tongue_sign.json';

const DisplayData = () => {
  const [queryResults, setQueryResults] = useState({});
  const [patientInfo, setPatientInfo] = useState(null);

  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Observer này sẽ được gọi mỗi khi trạng thái đăng nhập thay đổi
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Người dùng đã đăng nhập, lấy email từ đối tượng user
        setUserEmail(user.email);
      } else {
        // Người dùng đã đăng xuất
        setUserEmail('');
      }
    });

    // Cleanup subscription khi component unmount
    return unsubscribe;
  }, []);



  
  useEffect(() => {
    if (!userEmail) return; // Nếu không có email, không cần thực hiện gì cả
  
    const fetchData = async () => {
      try {
        const username = userEmail.split('@')[0];
        const docId = sessionStorage.getItem('docId'); // Lấy docId từ sessionStorage
  
        if (docId) {
          // Truy vấn dữ liệu dựa trên docId
          const docRef = doc(getFirestore(), username, docId);
          const docSnap = await getDoc(docRef);
  
          if (docSnap.exists()) {
            const { imgUrl, patientInfor, ...fetchedDataNew } = docSnap.data();
            setPatientInfo(patientInfor);
  
            // Process and query data with the new object that does not contain imgUrl
            const results = processAndQueryData(fetchedDataNew, jsonData);
            setQueryResults(results);
          } else {
            console.log('No such document!');
          }
        } else {
          console.log('No document ID found in sessionStorage');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [userEmail]); // Run once on component mount
  

  const renderResults = (results) => {
    // Lấy ảnh từ session storage
    const croppedImage = sessionStorage.getItem("croppedImage");

    // Thêm đoạn này mới
    // Destructure patientInfor from the state
    const { age, gender, name, symptoms } = patientInfo || {};

  
    return (
<div className="p-4 bg-white rounded-lg shadow-md">
  {patientInfo && (
  <div className="mt-4 p-4 bg-gray-100 rounded-lg">
  {croppedImage && <img src={croppedImage} alt="Cropped" className="w-screen h-auto object-contain rounded-lg" />}

      <h2 className="text-3xl font-semibold">Thông tin bệnh nhân</h2>
      <div className="flex flex-col space-y-2 mt-2">
      <p className="font-semibold text-xl">Tên: {name}</p>
      <p className="font-semibold text-xl">Tuổi: {age}</p>
      <p className="font-semibold text-xl">Giới tính: {gender}</p>
      <p className="font-semibold text-xl">Triệu chứng: {symptoms}</p>
      </div>
    </div>
  )}
  
  {/* Kết quả chẩn đoán */}
  {Object.entries(results).map(([keyLevel1, keyLevel2Data]) => (
    <div key={keyLevel1} className="mt-4 p-4 bg-gray-100 rounded-lg">
    <h2 className="text-3xl font-semibold">{keyLevel1}</h2>
    {renderKeyLevel2(keyLevel2Data)}
  </div>
))}
</div>
    );
  };
  

  const renderKeyLevel2 = (keyLevel2Data) => {
    return Object.entries(keyLevel2Data).map(([keyLevel2, value]) => (
      <div key={keyLevel2} className="mb-4">
        <h3 className="text-xl font-semibold">{keyLevel2}</h3>
        {typeof value === 'object' ? renderKeyLevel3(value) : <p className="text-sm">{value}</p>}
      </div>
    ));
  };
  
  const renderKeyLevel3 = (keyLevel3Data) => {
    return Object.entries(keyLevel3Data).map(([keyLevel3, diagnosis]) => (
<div key={keyLevel3} className="mb-2">
  <strong className="text-lg font-semibold block">{keyLevel3}</strong>
  <span className="text-lg block">Chẩn đoán: {diagnosis}</span>
</div>
    ));
  };
  
  return (
    <div className="p-4">
      {renderResults(queryResults)}
    </div>
  );
  };

export default DisplayData;
