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
import GlobalSetting from "./Modules/GlobalSetting/GlobalSettingManifest"
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
                AccessRight.routes,
                ActivityLog.routes,
                Address.routes,
                Adjustment.routes,
                AppMenu.routes,
                City.routes,
                Contact.routes,
                Country.routes,
                Courier.routes,
                Currency.routes,
                DeliveryFee.routes,
                GlobalSetting.routes,
                Group.routes,
                LocationManifest.routes,
                Material.routes,
                Measurement.routes,
                MeasurementCategory.routes,
                Menu.routes,
                OperationType.routes,
                PaymentTerm.routes,
                Product.routes,
                ProductCategory.routes,
                Region.routes,
                SalesOrder.routes,
                SalesOrderLine.routes,
                Sequence.routes,
                Source.routes,
                StockMovement.routes,
                Transfer.routes,
                User.routes,
                Warehouse.routes
            ]}
        />
    )
};

export default Routerist;
