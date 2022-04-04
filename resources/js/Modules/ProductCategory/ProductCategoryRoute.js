import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import {uuidv4} from "../../Helpers/string";

import ProductCategoryList from './ProductCategoryList';
import ProductCategoryForm from './ProductCategoryForm';

const ProductCategoryRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={uuidv4()} path={`/${moduleName}`}
                   render={props => <ProductCategoryList key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${moduleName}/create`}
                   render={props => <ProductCategoryForm key={props.location.key}/>}
            />
            <Route exact key={uuidv4()} path={`/${moduleName}/:id`}
                   render={props => <ProductCategoryForm key={props.location.key}/>}
            />
        </Switch>
    );
};

export default ProductCategoryRoute;
