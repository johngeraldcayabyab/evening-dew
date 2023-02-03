import React from 'react';
import MeasurementCategoryManifest from "./MeasurementCategoryManifest"
import FormGenerator from "../../Components/Form/FormGenerator"

const MeasurementCategoryForm = () => {
    return (<FormGenerator {...MeasurementCategoryManifest} />)
};

export default MeasurementCategoryForm;
