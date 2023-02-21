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
import LocationManifest from "./Modules/LocationManifest"
import Material from "./Modules/MaterialManifest"
import Measurement from "./Modules/MeasurementManifest"
import MeasurementCategory from "./Modules/MeasurementCategoryManifest"
import Menu from "./Modules/MenuManifest"
import OperationType from "./Modules/OperationTypeManifest"
import PaymentTerm from "./Modules/PaymentTermManifest"
import Product from "./Modules/ProductManifest"
import ProductCategory from "./Modules/ProductCategoryManifest"
import Region from "./Modules/RegionManifest"
import SalesOrder from "./Modules/SalesOrder/SalesOrderManifest"
import SalesOrderLine from "./Modules/SalesOrderLineManifest"
import Sequence from "./Modules/SequenceManifest"
import Source from "./Modules/SourceManifest"
import StockMovement from "./Modules/StockMovementManifest"
import Transfer from "./Modules/TransferManifest"
import User from "./Modules/UserManifest"
import Warehouse from "./Modules/WarehouseManifest"
import SwitchMaster from "./Components/SwitchMaster"

const Routerist = () => {
    return (
        <SwitchMaster
            switches={[
                AccessRight,
                ActivityLog,
                Address,
                Adjustment,
                AppMenu,
                City,
                Contact,
                Country,
                Courier,
                Currency,
                DeliveryFee,
                GlobalSetting,
                Group,
                LocationManifest,
                Material,
                Measurement,
                MeasurementCategory,
                Menu,
                OperationType,
                PaymentTerm,
                Product,
                ProductCategory,
                Region,
                SalesOrder,
                SalesOrderLine,
                Sequence,
                Source,
                StockMovement,
                Transfer,
                User,
                Warehouse
            ]}
        />
    )
};

export default Routerist;
