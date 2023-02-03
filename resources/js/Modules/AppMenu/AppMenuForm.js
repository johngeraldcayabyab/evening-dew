import React from 'react';
import AppMenuManifest from "./AppMenuManifest"
import FormGenerator from "../../Components/Form/FormGenerator"

const AppMenuForm = () => {
    return (<FormGenerator {...AppMenuManifest} />)
};

export default AppMenuForm;
