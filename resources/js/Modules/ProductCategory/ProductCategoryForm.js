import React from 'react';
import FormGenerator from "../../Components/Form/FormGenerator";
import ProductCategoryManifest from "./ProductCategoryManifest"

const ProductCategoryForm = () => {
    return <FormGenerator {...ProductCategoryManifest}/>
};

export default ProductCategoryForm;
