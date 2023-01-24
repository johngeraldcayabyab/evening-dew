import product_manifest from "./product_manifest.json"
import ProductForm from "./ProductForm"
import ProductTable from "./ProductTable"

export default {
    "moduleName": "products",
    "displayName": "products",
    "queryDefaults": {},
    "routes": [
        {path: `/${product_manifest.displayName}/create`, component: ProductForm},
        {path: `/${product_manifest.displayName}/:id`, component: ProductForm},
        {path: `/${product_manifest.displayName}`, component: ProductTable},
    ]
};
