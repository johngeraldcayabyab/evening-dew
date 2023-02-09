import ProductCategoryTable from "./ProductCategoryTable";
import FormGenerator from "../../Components/Form/FormGenerator"

const displayName = "product_categories";

const manifest = {
    "moduleName": "product_categories",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: () => (<FormGenerator {...manifest} />)},
        {path: `/${displayName}/:id`, component: () => (<FormGenerator {...manifest} />)},
        {path: `/${displayName}`, component: ProductCategoryTable},
    ],
    form: {
        initialValue: true,
        row_1: {
            col_1: [
                {
                    type: 'text',
                    name: 'category',
                    label: 'Category',
                    required: true,
                    size: 'large',
                },
                {
                    type: 'select',
                    name: 'parent_product_category_id',
                    label: 'Parent Category',
                    query: {url: '/api/product_categories', field: 'parent_category.category'},
                },
            ]
        },
    }
};

export default manifest;
