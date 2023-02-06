import StockMovementForm from "./StockMovementForm";
import StockMovementTable from "./StockMovementTable";

const displayName = "stock_movements";

export default {
    "moduleName": "stock_movements",
    "displayName": displayName,
    "queryDefaults": {},
    routes: [
        {path: `/${displayName}/create`, component: StockMovementForm},
        {path: `/${displayName}/:id`, component: StockMovementForm},
        {path: `/${displayName}`, component: StockMovementTable},
    ],
    form: {
        row_1: {
            col_1: [
                {
                    type: 'text',
                    name: 'reference',
                    label: 'Reference',
                    required: true,
                },
                {
                    type: 'text',
                    name: 'source',
                    label: 'Source',
                },
                {
                    type: 'select',
                    name: 'product_id',
                    label: 'Product',
                    query: {url: '/api/products', field: 'product.name'},
                    required: true
                },
                {
                    type: 'select',
                    name: 'source_location_id',
                    label: 'Please select source location',
                    query: {url: '/api/locations', field: 'source_location.name'},
                    required: true
                },
                {
                    type: 'select',
                    name: 'destination_location_id',
                    label: 'Please select destination location',
                    query: {url: '/api/locations', field: 'destination_location.name'},
                    required: true
                },
                {
                    type: 'number',
                    name: 'quantity_done',
                    label: 'Quantity',
                    required: true
                },
            ]
        }
    }
};
