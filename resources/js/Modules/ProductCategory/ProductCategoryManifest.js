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
    ],
    form:{
        initialValue: true,
        row_1:{
            col_1:[
                {
                    type: 'text',
                    name: 'category',
                    label: 'Category',
                    message: 'Please input category',
                    required: true,
                    size: 'large',
                },
                {
                    type: 'select',
                    name: 'parent_product_category_id',
                    label: 'Parent Category',
                    query: {url: '/api/product_categories', field: 'parent_category.category', name: 'parentCategoryOptions'},
                },
            ]
        },
    }
};
