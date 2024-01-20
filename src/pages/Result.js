import React from 'react';
import DisplayData from '../components/DisplayData';
import Carousel from '../components/Carousel';
import BottomNavigator from '../components/BottomNavigator';

const Result = () => {
  return (
    <div>

<div id="result" className="pb-20"> {/* Thêm padding-bottom */}
      <h1 className="text-2xl font-bold text-center">Kết quả chẩn đoán</h1>
      <DisplayData />
      <Carousel />
      </div>
      <BottomNavigator />
    </div>
  );
};

export default Result;
