import AccessRight from "./Modules/AccessRight/AccessRightManifest"
import ActivityLog from "./Modules/ActivityLog/ActivityLogManifest"
import Address from "./Modules/Address/AddressManifest"
import Adjustment from "./Modules/Adjustment/AdjustmentManifest"
import AppMenu from "./Modules/AppMenu/AppMenuManifest"
import City from "./Modules/City/CityManifest"
import Contact from "./Modules/Contact/ContactManifest"
import Country from "./Modules/Country/CountryManifest"
import Courier from "./Modules/Courier/CourierManifest"
import Currency from "./Modules/Currency/CurrencyManifest"
import DeliveryFee from "./Modules/DeliveryFee/DeliveryFeeManifest"
import GlobalSetting from "./Modules/GlobalSetting/GlobalSettingManifest"
import Group from "./Modules/Group/GroupManifest"
import LocationManifest from "./Modules/Location/LocationManifest"
import Material from "./Modules/Material/MaterialManifest"
import Measurement from "./Modules/Measurement/MeasurementManifest"
import MeasurementCategory from "./Modules/MeasurementCategory/MeasurementCategoryManifest"
import Menu from "./Modules/Menu/MenuManifest"
import OperationType from "./Modules/OperationType/OperationTypeManifest"
import PaymentTerm from "./Modules/PaymentTerm/PaymentTermManifest"
import Product from "./Modules/Product/ProductManifest"
import ProductCategory from "./Modules/ProductCategory/ProductCategoryManifest"
import Region from "./Modules/Region/RegionManifest"
import SalesOrder from "./Modules/SalesOrder/SalesOrderManifest"
import SalesOrderLine from "./Modules/SalesOrderLine/SalesOrderLineManifest"
import Sequence from "./Modules/Sequence/SequenceManifest"
import Source from "./Modules/Source/SourceManifest"
import StockMovement from "./Modules/StockMovement/StockMovementManifest"
import Transfer from "./Modules/Transfer/TransferManifest"
import User from "./Modules/User/UserManifest"
import Warehouse from "./Modules/Warehouse/WarehouseManifest"
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
