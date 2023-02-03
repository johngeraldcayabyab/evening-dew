import React from 'react';
import AddressManifest from "./AddressManifest"
import FormGenerator from "../../Components/Form/FormGenerator"

const AddressForm = () => {
    return <FormGenerator {...AddressManifest} />
};

export default AddressForm;
