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
import AccessRight from "./Modules/AccessRight/AccessRightManifest"
import ActivityLog from "./Modules/ActivityLog/ActivityLogManifest"
import Warehouse from "./Modules/Warehouse/WarehouseManifest"
import User from "./Modules/User/UserManifest"
import Group from "./Modules/Group/GroupManifest"
import Transfer from "./Modules/Transfer/TransferManifest"
import StockMovement from "./Modules/StockMovement/StockMovementManifest"
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
                        <HomeRoute/>
                        <LoginRoute/>
                    </AppContainerWithContent>
                </AppContextProvider>
            </BrowserRouter>
        )
    }
;

render(<App/>, document.getElementById('root'));

