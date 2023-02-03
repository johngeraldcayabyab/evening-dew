import React from 'react';
import SourceManifest from "./SourceManifest"
import FormGenerator from "../../Components/Form/FormGenerator"

const SourceForm = () => {
    return (<FormGenerator {...SourceManifest}/>)
};


export default SourceForm;
