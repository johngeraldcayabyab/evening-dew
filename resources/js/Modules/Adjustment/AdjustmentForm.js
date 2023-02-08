import React from 'react';
import AdjustmentManifest from "./AdjustmentManifest"
import FormGenerator from "../../Components/Form/FormGenerator"

const AdjustmentForm = () => {
    return <FormGenerator {...AdjustmentManifest}/>;
};

export default AdjustmentForm;
