import React from 'react';
import MeasurementManifest from "./MeasurementManifest"
import FormGenerator from "../../Components/Form/FormGenerator";

const MeasurementForm = () => {
    return <FormGenerator {...MeasurementManifest}/>
};
export default MeasurementForm;
