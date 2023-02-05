import React from 'react';
import LocationManifest from "./LocationManifest";
import FormGenerator from "../../Components/Form/FormGenerator";

const LocationForm = () => {
    return <FormGenerator {...LocationManifest} />
};

export default LocationForm;
