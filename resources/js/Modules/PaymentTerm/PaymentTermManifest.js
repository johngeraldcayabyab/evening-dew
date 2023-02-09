import PaymentTermTable from "./PaymentTermTable";
import FormGenerator from "../../Components/Form/FormGenerator"

const displayName = "payment_terms";

const manifest = {
    "moduleName": "payment_terms",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: () => (<FormGenerator {...manifest} />)},
        {path: `/${displayName}/:id`, component: () => (<FormGenerator {...manifest} />)},
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

export default manifest;
