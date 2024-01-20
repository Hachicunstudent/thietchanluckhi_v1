// FormInfor.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const FormInfor = () => {
  const [patientInfo, setPatientInfo] = useState({ name: '', age: '', gender: '', symptoms: '' });
  const navigate = useNavigate();


  const handleChange = (e) => {
    setPatientInfo({ ...patientInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem('patientInfo', JSON.stringify(patientInfo));
    navigate('/question'); // Điều hướng người dùng đến trang kết quả

    // Điều hướng tới trang mục tiêu hoặc xử lý tiếp theo
  };






  return (
<form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
  <div className="mb-4">
    <label className="block text-gray-900 text-lg font-bold mb-2" htmlFor="name">
      Họ và tên bệnh nhân:
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
      type="text"   
      name="name"
      value={patientInfo.name}
      onChange={handleChange}
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-900 text-lg font-bold mb-2" htmlFor="age">
      Tuổi:
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
      type="number"
      name="age"
      value={patientInfo.age}
      onChange={handleChange}
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-900 text-lg font-bold mb-2">Giới tính:</label>
    <div className="mt-2">
      <input
        type="radio"
        name="gender"
        value="Nam"
        checked={patientInfo.gender === 'Nam'}
        onChange={handleChange}
        className="mr-2"
      /> Nam
      <input
        type="radio"
        name="gender"
        value="Nữ"
        checked={patientInfo.gender === 'Nữ'}
        onChange={handleChange}
        className="ml-4"
      /> Nữ
    </div>
  </div>
  <div className="mb-4">
    <label className="block text-gray-900 text-lg font-bold mb-2" htmlFor="symptoms">
      Triệu chứng:
    </label>
    <textarea
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
      name="symptoms"
      value={patientInfo.symptoms}
      onChange={handleChange}
    />
  </div>
  <div className="mb-4 text-center">
    <button
      type="submit"
      className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
    >
      Gửi thông tin
    </button>
  </div>
</form>

  );
};

export default FormInfor;
