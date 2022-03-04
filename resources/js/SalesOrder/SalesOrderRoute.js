import {Route, Switch} from "react-router-dom";
import React from "react";
import manifest from "./__manifest__.json";
import SalesOrderList from "./SalesOrderList";
import SalesOrderForm from "./SalesOrderForm";
import SalesOrderTransferList from "./SalesOrderTransferList";

const SalesOrderRoute = () => {
    const moduleName = manifest.moduleName;
    return (
        <Switch>
            <Route exact key={`${moduleName}_table`} path={`/${moduleName}`}>
                <SalesOrderList/>
            </Route>
            <Route exact key={`${moduleName}_create`} path={`/${moduleName}/create`}>
                <SalesOrderForm/>
            </Route>
            <Route exact key={`${moduleName}_update`} path={`/${moduleName}/:id`}>
                <SalesOrderForm/>
            </Route>
            <Route exact key={`sales_order_transfers_table`} path={`/sales_order_transfers`}>
                <SalesOrderTransferList/>
            </Route>
        </Switch>
    );
};

export default SalesOrderRoute;
