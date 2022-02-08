import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import ProductCategoryList from "./ProductCategoryList";
import ProductCategoryForm from "./ProductCategoryForm";

const ProductCategoryRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={`${moduleName}_table`} path={`/${moduleName}`}>
                <ProductCategoryList/>
            </Route>
            <Route exact key={`${moduleName}_create`} path={`/${moduleName}/create`}>
                <ProductCategoryForm/>
            </Route>
            <Route exact key={`${moduleName}_update`} path={`/${moduleName}/:id`}>
                <ProductCategoryForm/>
            </Route>
        </Switch>
    );
};

export default ProductCategoryRoute;
