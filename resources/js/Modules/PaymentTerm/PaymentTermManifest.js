import PaymentTermForm from "./PaymentTermForm";
import PaymentTermTable from "./PaymentTermTable";

const displayName = "payment_terms";



export default {
    "moduleName": "payment_terms",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: PaymentTermForm},
        {path: `/${displayName}/:id`, component: PaymentTermForm},
        {path: `/${displayName}`, component: PaymentTermTable},
    ],
    form: {
        row_1: {
            col_1: [
                {
                    type: 'text',
                    name: 'name',
                    label: 'Name',
                    required: true,
                },
            ]
        }
    }
};
