import React from 'react';
import RegionManifest from "./RegionManifest"
import FormGenerator from "../../Components/Form/FormGenerator"

const RegionForm = () => {
    return <FormGenerator {...RegionManifest} />;
};

export default RegionForm;
