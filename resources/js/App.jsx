import "../sass/App.scss";
import './bootstrap.js';
import React, {useState} from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {getCookie} from "./Helpers/cookie";
import ContentContainer from './Components/ContentContainter';
import {AppContextProvider} from "./Contexts/AppContext";
import {createRoot} from 'react-dom/client';
import Home from "./Modules/Home/Home";
import Login from "./Modules/Login/Login";
import AccessRight from "./Modules/AccessRightManifest";
import ActivityLog from "./Modules/ActivityLogManifest";
import Address from "./Modules/AddressManifest";
import Adjustment from "./Modules/AdjustmentManifest";
import AppMenu from "./Modules/AppMenuManifest";
import Bank from "./Modules/BankManifest";
import Bill from "./Modules/BillManifest";
import BankAccount from "./Modules/BankAccountManifest";
import ChartOfAccount from "./Modules/ChartOfAccountManifest";
import City from "./Modules/CityManifest";
import Contact from "./Modules/ContactManifest";
import Country from "./Modules/CountryManifest";
import Courier from "./Modules/CourierManifest";
import Currency from "./Modules/CurrencyManifest";
import DeliveryFee from "./Modules/DeliveryFeeManifest";
import Group from "./Modules/GroupManifest";
import Invoice from "./Modules/InvoiceManifest";
import Journal from "./Modules/JournalManifest";
import Location from "./Modules/LocationManifest";
import Material from "./Modules/MaterialManifest";
import Measurement from "./Modules/MeasurementManifest";
import MeasurementCategory from "./Modules/MeasurementCategoryManifest";
import Menu from "./Modules/MenuManifest";
import OperationType from "./Modules/OperationTypeManifest";
import Payment from "./Modules/PaymentManifest";
import PaymentTerm from "./Modules/PaymentTermManifest";
import Product from "./Modules/ProductManifest";
import ProductCategory from "./Modules/ProductCategoryManifest";
import Purchase from "./Modules/PurchaseManifest";
import PurchaseSetting from "./Modules/PurchaseSettingManifest";
import Region from "./Modules/RegionManifest";
import SalesOrder from "./Modules/SalesOrderManifest";
import SalesOrderLine from "./Modules/SalesOrderLineManifest";
import SalesSetting from "./Modules/SalesSettingManifest";
import Sequence from "./Modules/SequenceManifest";
import Source from "./Modules/SourceManifest";
import StockLocationQuantity from "./Modules/StockLocationQuantityManifest";
import StockMovement from "./Modules/StockMovementManifest";
import Transfer from "./Modules/TransferManifest";
import User from "./Modules/UserManifest";
import Warehouse from "./Modules/WarehouseManifest";
import Pricelist from "./Modules/PricelistManifest";
import Company from "./Modules/CompanyManifest";
import Tax from "./Modules/TaxManifest";
import Option from "./Modules/OptionManifest";
import {HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE} from "./consts";
import FormGenerator from "./Components/Form/FormGenerator";
import ErrorPage from "./Error";
import TableGenerator from "./Components/TableAndKanban/TableGenerator"

const manifests = [
    AccessRight,
    ActivityLog,
    Address,
    Adjustment,
    AppMenu,
    Bank,
    Bill,
    BankAccount,
    ChartOfAccount,
    City,
    Company,
    Contact,
    Country,
    Courier,
    Currency,
    DeliveryFee,
    Group,
    Invoice,
    Journal,
    Location,
    Material,
    Measurement,
    MeasurementCategory,
    Menu,
    OperationType,
    Option,
    Payment,
    PaymentTerm,
    Product,
    ProductCategory,
    Purchase,
    PurchaseSetting,
    Region,
    SalesOrder,
    SalesOrderLine,
    SalesSetting,
    Sequence,
    Source,
    StockLocationQuantity,
    StockMovement,
    Tax,
    Transfer,
    User,
    Warehouse,
    Pricelist
];

const routes = [
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/home",
        element: <Home/>,
    },
];

manifests.forEach((manifest) => {
    const manifestRoutes = manifest.routes;
    const isRouteLength3 = manifestRoutes.length === 3;
    const hasTableAndCreate = manifestRoutes.includes(HAS_TABLE) && manifestRoutes.includes(HAS_FORM_CREATE);
    const hasTableAndUpdate = manifestRoutes.includes(HAS_TABLE) && manifestRoutes.includes(HAS_FORM_UPDATE);
    if (isRouteLength3 || hasTableAndCreate || hasTableAndUpdate) {
        const children = [{
            index: true,
            key: `${manifest.moduleName}-${manifest.displayName}`,
            element: <TableGenerator {...manifest} key={`${manifest.moduleName}-${manifest.displayName}-table`}/>,
        }];
        manifestRoutes.forEach((route) => {
            if (route === HAS_FORM_UPDATE) {
                children.push({
                    key: `${manifest.moduleName}-${manifest.displayName}-update`,
                    path: `:id`,
                    element: <FormGenerator {...manifest}
                                            key={`${manifest.moduleName}-${manifest.displayName}-update-form`}/>
                });
            } else if (route === HAS_FORM_CREATE) {
                children.push({
                    key: `${manifest.moduleName}-${manifest.displayName}-create`,
                    path: `create`,
                    element: <FormGenerator {...manifest}
                                            key={`${manifest.moduleName}-${manifest.displayName}-create-form`}/>
                });
            }
        });
        routes.push({
            key: `${manifest.moduleName}-${manifest.displayName}`,
            path: `${manifest.displayName}`,
            children: children
        });
    } else if (manifestRoutes.length === 1 && manifestRoutes.includes(HAS_FORM_CREATE)) {
        routes.push({
            index: true,
            key: `${manifest.moduleName}-${manifest.displayName}-create`,
            path: `/${manifest.displayName}`,
            element: <FormGenerator {...manifest} key={`${manifest.moduleName}-${manifest.displayName}-create-form`}/>
        });
    } else if (manifestRoutes.length === 1 && manifestRoutes.includes(HAS_TABLE)) {
        routes.push({
            index: true,
            key: `${manifest.moduleName}-${manifest.displayName}`,
            path: `/${manifest.displayName}`,
            element: <TableGenerator {...manifest} key={`${manifest.moduleName}-${manifest.displayName}-table`}/>
        });
    }
})


const router = createBrowserRouter([{
    element: <ContentContainer/>,
    errorElement: <ErrorPage/>,
    children: routes
}]);

const App = () => {
    const [appState, setAppState] = useState({
        isLogin: getCookie('Authorization'),
        userEmail: getCookie('userEmail'),
        appInitialLoad: true,
        user: {},
        globalSettings: {}
    });
    return (
        <AppContextProvider
            value={{
                appState: appState,
                setAppState: setAppState
            }}
        >
            <RouterProvider router={router}/>
        </AppContextProvider>
    )
};


let container = null;
document.addEventListener('DOMContentLoaded', function (event) {
    if (!container) {
        container = document.getElementById('root');
        const root = createRoot(container)
        root.render(<App/>);
    }
});
