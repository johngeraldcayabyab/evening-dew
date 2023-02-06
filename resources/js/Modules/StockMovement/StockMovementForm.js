import React from 'react';
import FormGenerator from "../../Components/Form/FormGenerator"
import StockMovementManifest from "./StockMovementManifest"

const StockMovementForm = () => {
    return <FormGenerator {...StockMovementManifest} />
};

export default StockMovementForm;
