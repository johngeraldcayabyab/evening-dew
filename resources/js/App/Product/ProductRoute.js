import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import {uuidv4} from "../../Helpers/string";

const ProductRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={uuidv4()} path={`/${moduleName}`}>
                <ProductList/>
            </Route>
            <Route exact key={uuidv4()} path={`/${moduleName}/create`}
                   render={props => <ProductForm key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${moduleName}/:id`}
                   render={props => <ProductForm key={props.location.key}/>}
            />
        </Switch>
    );
};

export default ProductRoute;
