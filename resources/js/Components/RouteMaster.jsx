import AccessRight from "../Modules/AccessRightManifest"
import ActivityLog from "../Modules/ActivityLogManifest"
import Address from "../Modules/AddressManifest"
import Adjustment from "../Modules/AdjustmentManifest"
import AppMenu from "../Modules/AppMenuManifest"
import Bank from "../Modules/BankManifest"
import Bill from "../Modules/BillManifest"
import BankAccount from "../Modules/BankAccountManifest"
import ChartOfAccount from "../Modules/ChartOfAccountManifest"
import City from "../Modules/CityManifest"
import Contact from "../Modules/ContactManifest"
import Country from "../Modules/CountryManifest"
import Courier from "../Modules/CourierManifest"
import Currency from "../Modules/CurrencyManifest"
import DeliveryFee from "../Modules/DeliveryFeeManifest"
import GlobalSetting from "../Modules/GlobalSettingManifest"
import Group from "../Modules/GroupManifest"
import Invoice from "../Modules/InvoiceManifest"
import Journal from "../Modules/JournalManifest"
import Location from "../Modules/LocationManifest"
import Material from "../Modules/MaterialManifest"
import Measurement from "../Modules/MeasurementManifest"
import MeasurementCategory from "../Modules/MeasurementCategoryManifest"
import Menu from "../Modules/MenuManifest"
import OperationType from "../Modules/OperationTypeManifest"
import Payment from "../Modules/PaymentManifest"
import PaymentTerm from "../Modules/PaymentTermManifest"
import Product from "../Modules/ProductManifest"
import ProductCategory from "../Modules/ProductCategoryManifest"
import Purchase from "../Modules/PurchaseManifest"
import Region from "../Modules/RegionManifest"
import SalesOrder from "../Modules/SalesOrderManifest"
import SalesOrderLine from "../Modules/SalesOrderLineManifest"
import Sequence from "../Modules/SequenceManifest"
import Source from "../Modules/SourceManifest"
import StockLocationQuantity from "../Modules/StockLocationQuantityManifest"
import StockMovement from "../Modules/StockMovementManifest"
import Transfer from "../Modules/TransferManifest"
import User from "../Modules/UserManifest"
import Warehouse from "../Modules/WarehouseManifest"
import Pricelist from "../Modules/PricelistManifest"
import Home from "../Modules/Home/Home"
import Login from "../Modules/Login/Login"
import {GET, HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE} from "../consts"
import useFetchHook from "../Hooks/useFetchHook"
import TableGenerator from "./TableAndKanban/TableGenerator"
import FormGenerator from "./Form/FormGenerator"
import {createBrowserRouter} from "react-router-dom"
import ContentContainer from "./ContentContainter"
import ErrorPage from "../Error"
import React from "react"

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
    const useFetch = useFetchHook();
    if (isRouteLength3 || hasTableAndCreate || hasTableAndUpdate) {
        const children = [{
            index: true,
            key: `${manifest.moduleName}-${manifest.displayName}`,
            element: <TableGenerator {...manifest} key={`${manifest.moduleName}-${manifest.displayName}-table`}/>,
            loader: async ({params}) => useFetch(`/api/${manifest.moduleName}`, GET),
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
