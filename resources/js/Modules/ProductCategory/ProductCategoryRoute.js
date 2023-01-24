import React from "react";
import manifest from "./__manifest__.json";
import ProductCategoryTable from './ProductCategoryTable';
import ProductCategoryForm from './ProductCategoryForm';
import Switcher from "../../Components/Switcher"

const ProductCategoryRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switcher
            routes={[
                {path: `/${displayName}/create`, component: ProductCategoryForm},
                {path: `/${displayName}/:id`, component: ProductCategoryForm},
                {path: `/${displayName}`, component: ProductCategoryTable},
            ]}
        />
    );
};

export default ProductCategoryRoute;
