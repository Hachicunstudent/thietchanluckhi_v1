// Question.js
import React from 'react';
import Carousel from '../components/Carousel';
import TabComponent from '../components/TabQuestion';
import jsonData from "../tongue_sign.json"
import { Tab } from 'react-tabs';

const Question = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-center">Chẩn đoán</h1>
            <TabComponent jsonData={jsonData}/>
            <Carousel />

        </div>
    );
};

export default Question;
