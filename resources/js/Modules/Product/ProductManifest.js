import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";

const displayName = "products";

export default {
    "moduleName": "products",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: ProductForm},
        {path: `/${displayName}/:id`, component: ProductForm},
        {path: `/${displayName}`, component: ProductTable},
    ]
};
