import React from 'react';
import DeliveryFeeManifest from "./DeliveryFeeManifest"
import FormGenerator from "../../Components/Form/FormGenerator";

const DeliveryFeeForm = () => {
    return <FormGenerator {...DeliveryFeeManifest}/>;
};

export default DeliveryFeeForm;
