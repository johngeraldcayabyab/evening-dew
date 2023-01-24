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
import AccessRight from "./Modules/AccessRight/AccessRight"
import ActivityLog from "./Modules/ActivityLog/ActivityLog"
import Warehouse from "./Modules/Warehouse/Warehouse"
import User from "./Modules/User/User"
import Group from "./Modules/Group/Group"
import Transfer from "./Modules/Transfer/Transfer"
import StockMovement from "./Modules/StockMovement/StockMovement"
import Address from "./Modules/Address/Address"
import Adjustment from "./Modules/Adjustment/Adjustment"
import AppMenu from "./Modules/AppMenu/AppMenu"
import City from "./Modules/City/City"
import Contact from "./Modules/Contact/Contact"
import Country from "./Modules/Country/Country"
import Courier from "./Modules/Courier/Courier"
import Currency from "./Modules/Currency/Currency"
import DeliveryFee from "./Modules/DeliveryFee/DeliveryFee"
import GlobalSetting from "./Modules/GlobalSetting/GlobalSetting"
import LocationManifest from "./Modules/Location/LocationManifest"
import Material from "./Modules/Material/Material"
import Measurement from "./Modules/Measurement/Measurement"
import MeasurementCategory from "./Modules/MeasurementCategory/MeasurementCategory"
import Menu from "./Modules/Menu/Menu"
import OperationType from "./Modules/OperationType/OperationType"
import PaymentTerm from "./Modules/PaymentTerm/PaymentTerm"
import Product from "./Modules/Product/Product"
import ProductCategory from "./Modules/ProductCategory/ProductCategory"
import Region from "./Modules/Region/Region"
import SalesOrder from "./Modules/SalesOrder/SalesOrder"
import SalesOrderLine from "./Modules/SalesOrderLine/SalesOrderLine"
import Sequence from "./Modules/Sequence/Sequence"
import Source from "./Modules/Source/Source"

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

