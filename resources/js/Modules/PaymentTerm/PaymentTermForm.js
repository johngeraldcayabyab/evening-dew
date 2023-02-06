import React from 'react';
import PaymentTermManifest from "./PaymentTermManifest"
import FormGenerator from "../../Components/Form/FormGenerator"

const PaymentTermForm = () => {
    return <FormGenerator {...PaymentTermManifest}/>
};

export default PaymentTermForm;
