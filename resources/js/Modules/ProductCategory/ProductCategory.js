import product_category_manifest from "./product_category_manifest.json"
import ProductCategoryForm from "./ProductCategoryForm"
import ProductCategoryTable from "./ProductCategoryTable"

export default {
    "moduleName": "product_categories",
    "displayName": "product_categories",
    "queryDefaults": {},
    "routes": [
        {path: `/${product_category_manifest.displayName}/create`, component: ProductCategoryForm},
        {path: `/${product_category_manifest.displayName}/:id`, component: ProductCategoryForm},
        {path: `/${product_category_manifest.displayName}`, component: ProductCategoryTable},
    ]
};
