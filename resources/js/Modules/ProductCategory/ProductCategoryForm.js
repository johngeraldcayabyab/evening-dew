import React from 'react';
import ProductManifest from "../Product/ProductManifest"
import FormGenerator from "../../Components/Form/FormGenerator";

const ProductCategoryForm = () => {
    return <FormGenerator {...ProductManifest} />
};

export default ProductCategoryForm;
