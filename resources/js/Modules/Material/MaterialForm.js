import React from 'react';
import MaterialManifest from "./MaterialManifest"
import FormGenerator from "../../Components/Form/FormGenerator"

const MaterialForm = () => {
    return <FormGenerator {...MaterialManifest}/>;
};

export default MaterialForm;
