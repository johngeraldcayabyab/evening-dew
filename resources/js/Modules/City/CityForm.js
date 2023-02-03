import React from 'react';
import CityManifest from "./CityManifest"
import FormGenerator from "../../Components/Form/FormGenerator"

const CityForm = () => {
    return <FormGenerator {...CityManifest} />
};

export default CityForm;
