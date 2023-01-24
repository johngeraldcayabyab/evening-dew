import contact_manifest from "./contact_manifest.json"
import ContactForm from "./ContactForm"
import ContactTable from "./ContactTable"

export default {
    "moduleName": "contacts",
    "displayName": "contacts",
    "queryDefaults": {},
    "routes": [
        {path: `/${contact_manifest.displayName}/create`, component: ContactForm},
        {path: `/${contact_manifest.displayName}/:id`, component: ContactForm},
        {path: `/${contact_manifest.displayName}`, component: ContactTable},
    ]
};
