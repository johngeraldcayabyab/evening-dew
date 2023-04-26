// import "antd/dist/antd.min.css";
import "../sass/App.scss";
import './bootstrap.js';
import React, {useState} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
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
import GlobalSetting from "./Modules/GlobalSettingManifest";
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
import Region from "./Modules/RegionManifest";
import SalesOrder from "./Modules/SalesOrderManifest";
import SalesOrderLine from "./Modules/SalesOrderLineManifest";
import Sequence from "./Modules/SequenceManifest";
import Source from "./Modules/SourceManifest";
import StockLocationQuantity from "./Modules/StockLocationQuantityManifest";
import StockMovement from "./Modules/StockMovementManifest";
import Transfer from "./Modules/TransferManifest";
import User from "./Modules/UserManifest";
import Warehouse from "./Modules/WarehouseManifest";
import Pricelist from "./Modules/PricelistManifest";
import {HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE} from "./consts";
import FormGenerator from "./Components/Form/FormGenerator";
import TableGenerator from "./Components/TableAndKanban/TableGenerator";

const App = () => {
    const [appState, setAppState] = useState({
        isLogin: getCookie('Authorization'),
        userEmail: getCookie('userEmail'),
        appInitialLoad: true,
        user: {},
        globalSetting: {},
    });

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
        Contact,
        Country,
        Courier,
        Currency,
        DeliveryFee,
        GlobalSetting,
        Group,
        Invoice,
        Journal,
        Location,
        Material,
        Measurement,
        MeasurementCategory,
        Menu,
        OperationType,
        Payment,
        PaymentTerm,
        Product,
        ProductCategory,
        Purchase,
        Region,
        SalesOrder,
        SalesOrderLine,
        Sequence,
        Source,
        StockLocationQuantity,
        StockMovement,
        Transfer,
        User,
        Warehouse,
        Pricelist
    ];

    return (
        <BrowserRouter>
            <AppContextProvider
                value={{
                    appState: appState,
                    setAppState: setAppState
                }}
            >
                <ContentContainer>
                    <Routes>
                        <Route key={'root'} path={`/`} element={<Navigate to={`/home`}/>}/>
                        <Route key={'home'} path={`/home`} element={<Home/>}/>
                        <Route key={'login-route'} path={`/login`} element={<Login/>}/>
                        {...manifests.map((manifest) => {
                            const manifestRoutes = manifest.routes;
                            let routes = [];

                            const isRouteLength3 = manifestRoutes.length === 3;
                            const hasTableAndCreate = manifestRoutes.includes(HAS_TABLE) && manifestRoutes.includes(HAS_FORM_CREATE);
                            const hasTableAndUpdate = manifestRoutes.includes(HAS_TABLE) && manifestRoutes.includes(HAS_FORM_UPDATE);

                            if (isRouteLength3 || hasTableAndCreate || hasTableAndUpdate) {
                                routes = manifestRoutes.map((route) => {
                                    if (route === HAS_FORM_CREATE) {
                                        return (
                                            <Route
                                                key={`${manifest.moduleName}-${manifest.displayName}-create-form`}
                                                path={`create`}
                                                element={<FormGenerator {...manifest}/>}
                                            />
                                        )
                                    } else if (route === HAS_FORM_UPDATE) {
                                        return (
                                            <Route
                                                key={`${manifest.moduleName}-${manifest.displayName}-update-form`}
                                                path={`:id`}
                                                element={<FormGenerator {...manifest}/>}
                                            />
                                        )
                                    } else if (route === HAS_TABLE) {
                                        return (
                                            <Route
                                                key={`${manifest.moduleName}-${manifest.displayName}-table`}
                                                path={`/`}
                                                element={<TableGenerator {...manifest}/>}
                                            />
                                        )
                                    }
                                });
                            } else if (manifestRoutes.length === 1 && manifestRoutes.includes(HAS_FORM_CREATE)) {
                                routes.push(
                                    <Route
                                        key={`${manifest.moduleName}-${manifest.displayName}-create-form`}
                                        path={`/`}
                                        element={<FormGenerator {...manifest}/>}
                                    />
                                )
                            } else if (manifestRoutes.length === 1 && manifestRoutes.includes(HAS_TABLE)) {
                                return (
                                    <Route
                                        key={`${manifest.moduleName}-${manifest.displayName}-table`}
                                        path={`/`}
                                        element={<TableGenerator {...manifest}/>}
                                    />
                                )
                            }

                            return (
                                <Route
                                    key={`${manifest.moduleName}-${manifest.displayName}`}
                                    path={`${manifest.moduleName}/*`}
                                    element={
                                        <Routes>
                                            {...routes}
                                        </Routes>
                                    }
                                />
                            );


                            // if (isRouteLength3 || hasTableAndCreate || hasTableAndUpdate) {
                            //     routes = manifestRoutes.map((route) => {
                            //         if (route === HAS_FORM_CREATE) {
                            //             return (
                            //                 <Route
                            //                     key={`${manifest.moduleName}-${manifest.displayName}-create-form`}
                            //                     path={`/${manifest.displayName}/create`}
                            //                     element={<FormGenerator {...manifest}/>}
                            //                 />
                            //             )
                            //         } else if (route === HAS_FORM_UPDATE) {
                            //             return (
                            //                 <Route
                            //                     key={`${manifest.moduleName}-${manifest.displayName}-update-form`}
                            //                     path={`/${manifest.displayName}/:id`}
                            //                     element={<FormGenerator {...manifest}/>}
                            //                 />
                            //             )
                            //         } else if (route === HAS_TABLE) {
                            //             return (
                            //                 <Route
                            //                     key={`${manifest.moduleName}-${manifest.displayName}-table`}
                            //                     path={`/${manifest.displayName}`}
                            //                     element={<TableGenerator {...manifest}/>}
                            //                 />
                            //             )
                            //         }
                            //     });
                            // } else if (manifestRoutes.length === 1 && manifestRoutes.includes(HAS_FORM_CREATE)) {
                            //     routes.push(
                            //         <Route
                            //             key={`${manifest.moduleName}-${manifest.displayName}-create-form`}
                            //             path={`/${manifest.displayName}`}
                            //             element={<FormGenerator {...manifest}/>}
                            //         />
                            //     )
                            // } else if (manifestRoutes.length === 1 && manifestRoutes.includes(HAS_TABLE)) {
                            //     return (
                            //         <Route
                            //             key={`${manifest.moduleName}-${manifest.displayName}-table`}
                            //             path={`/${manifest.displayName}`}
                            //             element={<TableGenerator {...manifest}/>}
                            //         />
                            //     )
                            // }
                            // return (
                            //     <Routes key={`${manifest.moduleName}-${manifest.displayName}-switch`}>
                            //         {routes}
                            //     </Routes>
                            // )
                        })}
                    </Routes>
                </ContentContainer>
            </AppContextProvider>

        </BrowserRouter>
    )
};

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App/>);

