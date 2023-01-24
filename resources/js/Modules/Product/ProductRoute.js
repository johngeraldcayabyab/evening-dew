import React from "react";
import manifest from "./__manifest__.json";
import ProductTable from './ProductTable';
import ProductForm from './ProductForm';
import Switcher from "../../Components/Switcher"

const ProductRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switcher
            routes={[
                {path: `/${displayName}/create`, component: ProductForm},
                {path: `/${displayName}/:id`, component: ProductForm},
                {path: `/${displayName}`, component: ProductTable},
            ]}
        />
    );
};

export default ProductRoute;
