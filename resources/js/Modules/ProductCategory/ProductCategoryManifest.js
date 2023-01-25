import ProductCategoryForm from "./ProductCategoryForm";
import ProductCategoryTable from "./ProductCategoryTable";

const displayName = "product_categories";

export default {
    "moduleName": "product_categories",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: ProductCategoryForm},
        {path: `/${displayName}/:id`, component: ProductCategoryForm},
        {path: `/${displayName}`, component: ProductCategoryTable},
    ]
};
