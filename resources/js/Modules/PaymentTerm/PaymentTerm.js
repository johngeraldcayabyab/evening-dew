import payment_term_manifest from "./payment_term_manifest.json"
import PaymentTermForm from "./PaymentTermForm"
import PaymentTermTable from "./PaymentTermTable"

export default {
    "moduleName": "payment_terms",
    "displayName": "payment_terms",
    "queryDefaults": {},
    "routes": [
        {path: `/${payment_term_manifest.displayName}/create`, component: PaymentTermForm},
        {path: `/${payment_term_manifest.displayName}/:id`, component: PaymentTermForm},
        {path: `/${payment_term_manifest.displayName}`, component: PaymentTermTable},
    ]
};
