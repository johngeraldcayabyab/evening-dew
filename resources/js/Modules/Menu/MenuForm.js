import React from 'react';
import MenuManifest from "./MenuManifest"
import FormGenerator from "../../Components/Form/FormGenerator";

const MenuForm = () => {
    return <FormGenerator {...MenuManifest} />
};

export default MenuForm;
