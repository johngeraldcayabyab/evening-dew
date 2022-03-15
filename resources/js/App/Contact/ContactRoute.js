import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import {uuidv4} from "../../Helpers/string";

const ContactRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={uuidv4()} path={`/${moduleName}`}
                   render={props => <ContactList key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${moduleName}/create`}
                   render={props => <ContactForm key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${moduleName}/:id`}
                   render={props => <ContactForm key={props.location.key}/>}
            />
        </Switch>
    );
};

export default ContactRoute;
