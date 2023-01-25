import React from 'react';
import SourceManifest from "./SourceManifest"
import FormGenerator from "../../Components/FormGenerator"

const SourceForm = () => {
    return (<FormGenerator {...SourceManifest}/>)
};


export default SourceForm;
