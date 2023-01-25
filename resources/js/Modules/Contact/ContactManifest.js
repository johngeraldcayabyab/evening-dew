import ContactForm from "./ContactForm";
import ContactTable from "./ContactTable";

const displayName = "contacts";

export default {
    "moduleName": "contacts",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: ContactForm},
        {path: `/${displayName}/:id`, component: ContactForm},
        {path: `/${displayName}`, component: ContactTable},
    ]
};
