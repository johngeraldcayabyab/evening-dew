import React, {useState} from 'react';
import {render} from 'react-dom';
import {DatePicker, message} from 'antd';
import 'antd/dist/antd.css';
import {UnitOfMeasureCategory} from "../UnitOfMeasureCategory/UnitOfMeasureCategory";
// import './index.css';

const App = () => {

    return (
        <main>
            <UnitOfMeasureCategory/>
        </main>
    );
};

render(<App/>, document.getElementById('root'));
