import React from 'react';
import SalesOrderManifest from "./SalesOrderManifest";
import FormGenerator from "../../Components/Form/FormGenerator";

const SalesOrderForm = () => {
    return <FormGenerator {...SalesOrderManifest} />;
};

export default SalesOrderForm;
