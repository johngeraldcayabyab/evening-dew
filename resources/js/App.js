import './bootstrap.js';
import React, {useEffect, useState} from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {getCookie} from "./Helpers/cookie";

import AppContainerWithContent from './Components/AppContainterWithContent';
import LoginRoute from './Modules/Login/LoginRoute';
import HomeRoute from "./Modules/Home/HomeRoute";
import {objectHasValue} from "./Helpers/object";
import {GET} from "./consts";
import useFetchHook from "./Hooks/useFetchHook";
import useFetchCatcherHook from "./Hooks/useFetchCatcherHook";
import SwitchMaster from "./Components/SwitchMaster"
import address_manifest from './Modules/Address/address_manifest.json';
import adjustment_manifest from './Modules/Adjustment/adjustment_manifest.json';
import app_menu_manifest from './Modules/AppMenu/app_menu_manifest.json';
import city_manifest from './Modules/City/city_manifest.json';
import contact_manifest from './Modules/Contact/contact_manifest.json';
import country_manifest from './Modules/Country/country_manifest.json';
import courier_manifest from './Modules/Courier/courier_manifest.json';
import currency_manifest from './Modules/Currency/currency_manifest.json';

import delivery_fee_manifest from './Modules/DeliveryFee/delivery_fee_manifest.json';
import global_setting_manifest from './Modules/GlobalSetting/global_setting_manifest.json';
import location_manifest from './Modules/Location/location_manifest.json';
import material_manifest from './Modules/Material/material_manifest.json';
import measurement_category_manifest from './Modules/MeasurementCategory/measurement_category_manifest.json';
import measurement_manifest from './Modules/Measurement/measurement_manifest.json';
import menu_manifest from './Modules/Menu/menu_manifest.json';
import operation_type_manifest from './Modules/OperationType/operation_type_manifest.json';
import payment_term_manifest from './Modules/PaymentTerm/payment_term_manifest.json';
import product_manifest from './Modules/Product/product_manifest.json';
import product_category_manifest from './Modules/ProductCategory/product_category_manifest.json';
import region_manifest from './Modules/Region/region_manifest.json';
import sales_order_manifest from './Modules/SalesOrder/sales_order_manifest.json';
import sales_order_line_manifest from './Modules/SalesOrderLine/sales_order_line_manifest.json';
import sequence_manifest from './Modules/Sequence/sequence_manifest.json';
import source_manifest from './Modules/Source/source_manifest.json';
import stock_movement_manifest from './Modules/StockMovement/stock_movement_manifest.json';
import transfer_manifest from './Modules/Transfer/transfer_manifest.json';
import user_manifest from './Modules/User/user_manifest.json';
import group_manifest from './Modules/Group/group_manifest.json';
import warehouse_manifest from './Modules/Warehouse/warehouse_manifest.json';


import AddressForm from "./Modules/Address/AddressForm"
import AddressTable from "./Modules/Address/AddressTable"
import AdjustmentForm from "./Modules/Adjustment/AdjustmentForm"
import AdjustmentTable from "./Modules/Adjustment/AdjustmentTable"
import AppMenuForm from "./Modules/AppMenu/AppMenuForm"
import AppMenuTable from "./Modules/AppMenu/AppMenuTable"
import CityForm from "./Modules/City/CityForm"
import CityTable from "./Modules/City/CityTable"
import ContactForm from "./Modules/Contact/ContactForm"
import ContactTable from "./Modules/Contact/ContactTable"
import CountryForm from "./Modules/Country/CountryForm"
import CountryTable from "./Modules/Country/CountryTable"
import CourierForm from "./Modules/Courier/CourierForm"
import CourierTable from "./Modules/Courier/CourierTable"
import CurrencyForm from "./Modules/Currency/CurrencyForm"
import CurrencyTable from "./Modules/Currency/CurrencyTable"
import DeliveryFeeForm from "./Modules/DeliveryFee/DeliveryFeeForm"
import DeliveryFeeTable from "./Modules/DeliveryFee/DeliveryFeeTable"
import GlobalSettingForm from "./Modules/GlobalSetting/GlobalSettingForm"
import LocationForm from "./Modules/Location/LocationForm"
import LocationTable from "./Modules/Location/LocationTable"
import MaterialForm from "./Modules/Material/MaterialForm"
import MaterialTable from "./Modules/Material/MaterialTable"
import MeasurementCategoryForm from "./Modules/MeasurementCategory/MeasurementCategoryForm"
import MeasurementCategoryTable from "./Modules/MeasurementCategory/MeasurementCategoryTable"
import MeasurementForm from "./Modules/Measurement/MeasurementForm"
import MeasurementTable from "./Modules/Measurement/MeasurementTable"
import MenuForm from "./Modules/Menu/MenuForm"
import MenuTable from "./Modules/Menu/MenuTable"
import OperationTypeForm from "./Modules/OperationType/OperationTypeForm"
import OperationTypeTable from "./Modules/OperationType/OperationTypeTable"
import PaymentTermForm from "./Modules/PaymentTerm/PaymentTermForm"
import PaymentTermTable from "./Modules/PaymentTerm/PaymentTermTable"
import ProductForm from "./Modules/Product/ProductForm"
import ProductTable from "./Modules/Product/ProductTable"
import ProductCategoryForm from "./Modules/ProductCategory/ProductCategoryForm"
import ProductCategoryTable from "./Modules/ProductCategory/ProductCategoryTable"
import RegionForm from "./Modules/Region/RegionForm"
import RegionTable from "./Modules/Region/RegionTable"
import SalesOrderForm from "./Modules/SalesOrder/SalesOrderForm"
import SalesOrderTable from "./Modules/SalesOrder/SalesOrderTable"
import SalesOrderLineTable from "./Modules/SalesOrderLine/SalesOrderLineTable"
import SequenceForm from "./Modules/Sequence/SequenceForm"
import SequenceTable from "./Modules/Sequence/SequenceTable"
import SourceForm from "./Modules/Source/SourceForm"
import SourceTable from "./Modules/Source/SourceTable"
import StockMovementForm from "./Modules/StockMovement/StockMovementForm"
import StockMovementTable from "./Modules/StockMovement/StockMovementTable"
import TransferForm from "./Modules/Transfer/TransferForm"
import TransferTable from "./Modules/Transfer/TransferTable"
import UserForm from "./Modules/User/UserForm"
import UserTable from "./Modules/User/UserTable"
import GroupForm from "./Modules/Group/GroupForm"
import GroupTable from "./Modules/Group/GroupTable"
import WarehouseForm from "./Modules/Warehouse/WarehouseForm"
import WarehouseTable from "./Modules/Warehouse/WarehouseTable"
import AccessRight from "./Modules/AccessRight/AccessRight"
import ActivityLog from "./Modules/ActivityLog/ActivityLog"

export const AppContext = React.createContext({});
export const AppContextProvider = AppContext.Provider;

const App = () => {
        const [appState, setAppState] = useState({
            isLogin: getCookie('Authorization'),
            userEmail: getCookie('userEmail'),
            appInitialLoad: true,
            user: {},
            globalSetting: {},
        });
        const useFetch = useFetchHook();
        const fetchCatcher = useFetchCatcherHook();

        useEffect(() => {
            window.Echo.channel('refresh-browser').listen('RefreshBrowserEvent', () => {
                window.location.reload();
            });

            if (appState.isLogin && !objectHasValue(appState.globalSetting)) {
                useFetch(`/api/users`, GET, {
                    email: getCookie('userEmail'),
                }).then((userResponse) => {
                    const user = userResponse.data[0];
                    let accessRights = [];
                    const userGroupLines = user.user_group_lines;
                    if (userGroupLines && userGroupLines.length) {
                        userGroupLines.forEach(userGroupLine => {
                            const group = userGroupLine.group;
                            if (group && group.access_rights && group.access_rights.length) {
                                accessRights = [...accessRights, ...group.access_rights];
                            }
                        });
                        accessRights = accessRights.filter((v, i, a) => a.findIndex(v2 => (v2.name === v.name)) === i);
                    }

                    useFetch(`/api/global_settings/initial_values`, GET).then((globalSettingResponse) => {
                        setAppState(prevState => ({
                            ...prevState,
                            isLogin: getCookie('Authorization'),
                            user: user,
                            accessRights: accessRights,
                            globalSetting: globalSettingResponse,
                            appInitialLoad: false,
                        }));
                    }).catch((responseErr) => {
                        fetchCatcher.get(responseErr);
                    });
                }).catch((responseErr) => {
                    fetchCatcher.get(responseErr);
                });
            }
        }, [appState.isLogin, appState.userEmail]);

        return (
            <BrowserRouter>
                <AppContextProvider value={{appState: appState, setAppState: setAppState}}>
                    <AppContainerWithContent>

                        <SwitchMaster
                            switches={[
                                AccessRight.routes,
                                ActivityLog.routes,
                                [
                                    {path: `/${address_manifest.displayName}/create`, component: AddressForm},
                                    {path: `/${address_manifest.displayName}/:id`, component: AddressForm},
                                    {path: `/${address_manifest.displayName}`, component: AddressTable},
                                ],
                                [
                                    {path: `/${adjustment_manifest.displayName}/create`, component: AdjustmentForm},
                                    {path: `/${adjustment_manifest.displayName}/:id`, component: AdjustmentForm},
                                    {path: `/${adjustment_manifest.displayName}`, component: AdjustmentTable},
                                ],
                                [
                                    {path: `/${app_menu_manifest.displayName}/create`, component: AppMenuForm},
                                    {path: `/${app_menu_manifest.displayName}/:id`, component: AppMenuForm},
                                    {path: `/${app_menu_manifest.displayName}`, component: AppMenuTable},
                                ],
                                [
                                    {path: `/${city_manifest.displayName}/create`, component: CityForm},
                                    {path: `/${city_manifest.displayName}/:id`, component: CityForm},
                                    {path: `/${city_manifest.displayName}`, component: CityTable},
                                ],
                                [
                                    {path: `/${contact_manifest.displayName}/create`, component: ContactForm},
                                    {path: `/${contact_manifest.displayName}/:id`, component: ContactForm},
                                    {path: `/${contact_manifest.displayName}`, component: ContactTable},
                                ],
                                [
                                    {path: `/${country_manifest.displayName}/create`, component: CountryForm},
                                    {path: `/${country_manifest.displayName}/:id`, component: CountryForm},
                                    {path: `/${country_manifest.displayName}`, component: CountryTable},
                                ],
                                [
                                    {path: `/${courier_manifest.displayName}/create`, component: CourierForm},
                                    {path: `/${courier_manifest.displayName}/:id`, component: CourierForm},
                                    {path: `/${courier_manifest.displayName}`, component: CourierTable},
                                ],
                                [
                                    {path: `/${currency_manifest.displayName}/create`, component: CurrencyForm},
                                    {path: `/${currency_manifest.displayName}/:id`, component: CurrencyForm},
                                    {path: `/${currency_manifest.displayName}`, component: CurrencyTable},
                                ],
                                [
                                    {path: `/${delivery_fee_manifest.displayName}/create`, component: DeliveryFeeForm},
                                    {path: `/${delivery_fee_manifest.displayName}/:id`, component: DeliveryFeeForm},
                                    {path: `/${delivery_fee_manifest.displayName}`, component: DeliveryFeeTable},
                                ],
                                [
                                    {path: `/${global_setting_manifest.displayName}`, component: GlobalSettingForm},
                                ],
                                [
                                    {path: `/${location_manifest.displayName}/create`, component: LocationForm},
                                    {path: `/${location_manifest.displayName}/:id`, component: LocationForm},
                                    {path: `/${location_manifest.displayName}`, component: LocationTable},
                                ],
                                [
                                    {path: `/${material_manifest.displayName}/create`, component: MaterialForm},
                                    {path: `/${material_manifest.displayName}/:id`, component: MaterialForm},
                                    {path: `/${material_manifest.displayName}`, component: MaterialTable},
                                ],
                                [
                                    {
                                        path: `/${measurement_category_manifest.displayName}/create`,
                                        component: MeasurementCategoryForm
                                    },
                                    {
                                        path: `/${measurement_category_manifest.displayName}/:id`,
                                        component: MeasurementCategoryForm
                                    },
                                    {
                                        path: `/${measurement_category_manifest.displayName}`,
                                        component: MeasurementCategoryTable
                                    },
                                ],
                                [
                                    {path: `/${measurement_manifest.displayName}/create`, component: MeasurementForm},
                                    {path: `/${measurement_manifest.displayName}/:id`, component: MeasurementForm},
                                    {path: `/${measurement_manifest.displayName}`, component: MeasurementTable},
                                ],
                                [
                                    {path: `/${menu_manifest.displayName}/create`, component: MenuForm},
                                    {path: `/${menu_manifest.displayName}/:id`, component: MenuForm},
                                    {path: `/${menu_manifest.displayName}`, component: MenuTable},
                                ],
                                [
                                    {path: `/${operation_type_manifest.displayName}/create`, component: OperationTypeForm},
                                    {path: `/${operation_type_manifest.displayName}/:id`, component: OperationTypeForm},
                                    {path: `/${operation_type_manifest.displayName}`, component: OperationTypeTable},
                                ],
                                [
                                    {path: `/${payment_term_manifest.displayName}/create`, component: PaymentTermForm},
                                    {path: `/${payment_term_manifest.displayName}/:id`, component: PaymentTermForm},
                                    {path: `/${payment_term_manifest.displayName}`, component: PaymentTermTable},
                                ],
                                [
                                    {path: `/${product_manifest.displayName}/create`, component: ProductForm},
                                    {path: `/${product_manifest.displayName}/:id`, component: ProductForm},
                                    {path: `/${product_manifest.displayName}`, component: ProductTable},
                                ],
                                [
                                    {
                                        path: `/${product_category_manifest.displayName}/create`,
                                        component: ProductCategoryForm
                                    },
                                    {path: `/${product_category_manifest.displayName}/:id`, component: ProductCategoryForm},
                                    {path: `/${product_category_manifest.displayName}`, component: ProductCategoryTable},
                                ],
                                [
                                    {path: `/${region_manifest.displayName}/create`, component: RegionForm},
                                    {path: `/${region_manifest.displayName}/:id`, component: RegionForm},
                                    {path: `/${region_manifest.displayName}`, component: RegionTable},
                                ],
                                [
                                    {path: `/${sales_order_manifest.displayName}/create`, component: SalesOrderForm},
                                    {path: `/${sales_order_manifest.displayName}/:id`, component: SalesOrderForm},
                                    {path: `/${sales_order_manifest.displayName}`, component: SalesOrderTable},
                                ],
                                [
                                    {path: `/${sales_order_line_manifest.displayName}`, component: SalesOrderLineTable},
                                ],
                                [
                                    {path: `/${sequence_manifest.displayName}/create`, component: SequenceForm},
                                    {path: `/${sequence_manifest.displayName}/:id`, component: SequenceForm},
                                    {path: `/${sequence_manifest.displayName}`, component: SequenceTable},
                                ],
                                [
                                    {path: `/${source_manifest.displayName}/create`, component: SourceForm},
                                    {path: `/${source_manifest.displayName}/:id`, component: SourceForm},
                                    {path: `/${source_manifest.displayName}`, component: SourceTable},
                                ],
                                [
                                    {path: `/${stock_movement_manifest.displayName}/create`, component: StockMovementForm},
                                    {path: `/${stock_movement_manifest.displayName}/:id`, component: StockMovementForm},
                                    {path: `/${stock_movement_manifest.displayName}`, component: StockMovementTable},
                                ],
                                [
                                    {path: `/${transfer_manifest.displayName}/create`, component: TransferForm},
                                    {path: `/${transfer_manifest.displayName}/:id`, component: TransferForm},
                                    {path: `/${transfer_manifest.displayName}`, component: TransferTable},
                                ],
                                [
                                    {path: `/${user_manifest.displayName}/create`, component: UserForm},
                                    {path: `/${user_manifest.displayName}/:id`, component: UserForm},
                                    {path: `/${user_manifest.displayName}`, component: UserTable},
                                ],
                                [
                                    {path: `/${group_manifest.displayName}/create`, component: GroupForm},
                                    {path: `/${group_manifest.displayName}/:id`, component: GroupForm},
                                    {path: `/${group_manifest.displayName}`, component: GroupTable},
                                ],
                                [
                                    {path: `/${warehouse_manifest.displayName}/create`, component: WarehouseForm},
                                    {path: `/${warehouse_manifest.displayName}/:id`, component: WarehouseForm},
                                    {path: `/${warehouse_manifest.displayName}`, component: WarehouseTable},
                                ]
                            ]}
                        />
                        <HomeRoute/>
                        <LoginRoute/>

                    </AppContainerWithContent>
                </AppContextProvider>
            </BrowserRouter>
        )
    }
;

render(<App/>, document.getElementById('root'));

