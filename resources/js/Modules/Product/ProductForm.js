import React from 'react';
import ProductManifest from "./ProductManifest"
import FormGenerator from "../../Components/Form/FormGenerator";

const ProductForm = () => {
    return <FormGenerator {...ProductManifest} />
};

export default ProductForm;
