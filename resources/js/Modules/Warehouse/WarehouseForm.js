import React from 'react';
import WarehouseManifest from "./WarehouseManifest"
import FormGenerator from "../../Components/Form/FormGenerator"

const WarehouseForm = () => {
    return <FormGenerator {...WarehouseManifest} />
};

export default WarehouseForm;
