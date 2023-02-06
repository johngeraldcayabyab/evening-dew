import React from 'react';
import OperationTypeManifest from "./OperationTypeManifest"
import FormGenerator from "../../Components/Form/FormGenerator";

const OperationTypeForm = () => {
    return <FormGenerator {...OperationTypeManifest}/>
};

export default OperationTypeForm;
