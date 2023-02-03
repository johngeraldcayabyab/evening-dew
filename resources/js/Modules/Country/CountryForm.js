import React from 'react';
import CountryManifest from "./CountryManifest"
import FormGenerator from "../../Components/Form/FormGenerator"

const CountryForm = () => {
    return <FormGenerator {...CountryManifest}/>;
};

export default CountryForm;
