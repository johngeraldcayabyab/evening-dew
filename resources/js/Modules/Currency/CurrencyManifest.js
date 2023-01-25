import CurrencyForm from "./CurrencyForm";
import CurrencyTable from "./CurrencyTable";

const displayName = "currencies";

export default {
    "moduleName": "currencies",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: CurrencyForm},
        {path: `/${displayName}/:id`, component: CurrencyForm},
        {path: `/${displayName}`, component: CurrencyTable},
    ],
    formFields: [
        [
            [
                {
                    type: 'text',
                    name: 'currency',
                    label: 'Currency',
                    message: 'Please Input Currency',
                    required: true
                },
                {
                    type: 'text',
                    name: 'name',
                    label: 'Name',
                },
            ],
            [
                {
                    type: 'text',
                    name: 'unit',
                    label: 'Unit',
                },
                {
                    type: 'text',
                    name: 'sub_unit',
                    label: 'sub_unit',
                },
            ],
        ],
        [
            [
                {
                    type: 'number',
                    name: 'rounding_factor',
                    label: 'Rounding Factor',
                },
                {
                    type: 'number',
                    name: 'decimal_places',
                    label: 'Decimal Places',
                },
            ],
            [
                {
                    type: 'text',
                    name: 'symbol',
                    label: 'Symbol',
                    message: 'Please input symbol',
                    required: true
                },
                {
                    type: 'select',
                    name: 'symbol_position',
                    label: 'Symbol Position',
                    message: 'Please select symbol position',
                    required: true,
                    options: [
                        {value: 'after_amount', label: 'After Amount'},
                        {value: 'before_amount', label: 'Before Amount'},
                    ]
                },
            ]
        ],
    ],
};
