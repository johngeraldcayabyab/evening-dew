import AccessRight from "./Modules/AccessRightManifest"
import ActivityLog from "./Modules/ActivityLogManifest"
import Address from "./Modules/AddressManifest"
import Adjustment from "./Modules/AdjustmentManifest"
import AppMenu from "./Modules/AppMenuManifest"
import City from "./Modules/CityManifest"
import Contact from "./Modules/ContactManifest"
import Country from "./Modules/CountryManifest"
import Courier from "./Modules/CourierManifest"
import Currency from "./Modules/CurrencyManifest"
import DeliveryFee from "./Modules/DeliveryFeeManifest"
import GlobalSetting from "./Modules/GlobalSettingManifest"
import Group from "./Modules/GroupManifest"
import Location from "./Modules/LocationManifest"
import Material from "./Modules/MaterialManifest"
import Measurement from "./Modules/MeasurementManifest"
import MeasurementCategory from "./Modules/MeasurementCategoryManifest"
import Menu from "./Modules/MenuManifest"
import OperationType from "./Modules/OperationTypeManifest"
import PaymentTerm from "./Modules/PaymentTermManifest"
import Product from "./Modules/ProductManifest"
import ProductCategory from "./Modules/ProductCategoryManifest"
import Region from "./Modules/RegionManifest"
import SalesOrder from "./Modules/SalesOrderManifest"
import SalesOrderLine from "./Modules/SalesOrderLineManifest"
import Sequence from "./Modules/SequenceManifest"
import Source from "./Modules/SourceManifest"
import StockMovement from "./Modules/StockMovementManifest"
import Transfer from "./Modules/TransferManifest"
import User from "./Modules/UserManifest"
import Warehouse from "./Modules/WarehouseManifest"
import StockLocationQuantity from "./Modules/StockLocationQuantityManifest"
import Bank from "./Modules/BankManifest"
import FormGenerator from "./Components/Form/FormGenerator"
import TableGenerator from "./Components/TableAndKanban/TableGenerator"
import BankAccount from "./Modules/BankAccountManifest"
import Purchase from "./Modules/PurchaseManifest"
import Journal from "./Modules/JournalManifest"
import Invoice from "./Modules/InvoiceManifest"
import Payment from "./Modules/PaymentManifest"
import ChartOfAccount from "./Modules/ChartOfAccountManifest";
import Pricelist from "./Modules/PricelistManifest";
import Bill from "./Modules/BillManifest";
import {HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE} from "./consts";
import {Route, Routes} from "react-router-dom"

const RouteMaster = () => {
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

    return manifests.map((manifest) => {
        const manifestRoutes = manifest.routes;
        let routes = [];

        if (
            manifestRoutes.length === 3 ||
            (manifestRoutes.includes(HAS_TABLE) && manifestRoutes.includes(HAS_FORM_CREATE)) ||
            (manifestRoutes.includes(HAS_TABLE) && manifestRoutes.includes(HAS_FORM_UPDATE))
        ) {
            routes = manifestRoutes.map((route) => {
                if (route === HAS_FORM_CREATE) {
                    return (
                        <Route
                            key={`${manifest.moduleName}-${manifest.displayName}-create-form`}
                            path={`/${manifest.displayName}/create`}
                            element={<FormGenerator {...manifest}/>}
                        />
                    )
                } else if (route === HAS_FORM_UPDATE) {
                    return (
                        <Route
                            key={`${manifest.moduleName}-${manifest.displayName}-update-form`}
                            path={`/${manifest.displayName}/:id`}
                            element={<FormGenerator {...manifest}/>}
                        />
                    )
                } else if (route === HAS_TABLE) {
                    return (
                        <Route
                            key={`${manifest.moduleName}-${manifest.displayName}-table`}
                            path={`/${manifest.displayName}`}
                            element={<TableGenerator {...manifest}/>}
                        />
                    )
                }
            });
        } else if (manifestRoutes.length === 1 && manifestRoutes.includes(HAS_FORM_CREATE)) {
            routes.push(
                <Route
                    key={`${manifest.moduleName}-${manifest.displayName}-create-form`}
                    path={`/${manifest.displayName}`}
                    element={<FormGenerator {...manifest}/>}
                />
            )
        } else if (manifestRoutes.length === 1 && manifestRoutes.includes(HAS_TABLE)) {
            return (
                <Route
                    key={`${manifest.moduleName}-${manifest.displayName}-table`}
                    path={`/${manifest.displayName}`}
                    element={<TableGenerator {...manifest}/>}
                />
            )
        }
        return (
            <Routes key={`${manifest.moduleName}-${manifest.displayName}-switch`}>
                {routes}
            </Routes>
        )
    });
};

export default RouteMaster;
