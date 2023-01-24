import React from "react";
import manifest from "./__manifest__.json";
import ContactTable from './ContactTable';
import ContactForm from './ContactForm';
import Switcher from "../../Components/Switcher"

const ContactRoute = () => {
    const displayName = manifest.displayName;
    return (
        <Switcher
            routes={[
                {path: `/${displayName}/create`, component: ContactForm},
                {path: `/${displayName}/:id`, component: ContactForm},
                {path: `/${displayName}`, component: ContactTable},
            ]}
        />
    );
};

export default ContactRoute;
