import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";

const ContactRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={`${moduleName}_table`} path={`/${moduleName}`}>
                <ContactList/>
            </Route>
            <Route exact key={`${moduleName}_create`} path={`/${moduleName}/create`}>
                <ContactForm/>
            </Route>
            <Route exact key={`${moduleName}_update`} path={`/${moduleName}/:id`}>
                <ContactForm/>
            </Route>
        </Switch>
    );
};

export default ContactRoute;
