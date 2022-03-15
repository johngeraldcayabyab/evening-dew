import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import AddressList from "./AddressList";
import AddressForm from "./AddressForm";
import {uuidv4} from "../../Helpers/string";

const AddressRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={uuidv4()} path={`/${moduleName}`}
                   render={props => <AddressList key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${moduleName}/create`}
                   render={props => <AddressForm key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${moduleName}/:id`}
                   render={props => <AddressForm key={props.location.key}/>}
            />
        </Switch>
    );
};

export default AddressRoute;
