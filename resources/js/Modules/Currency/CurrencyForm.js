import React from 'react';
import CurrencyManifest from "./CurrencyManifest"
import FormGenerator from "../../Components/FormGenerator"

const CurrencyForm = () => {
    return (<FormGenerator {...CurrencyManifest}/>);
};

export default CurrencyForm;
