import './bootstrap.js';
import React, {useEffect, useState} from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {getCookie} from "./Helpers/cookie";

import AppContainerWithContent from './Components/AppContainterWithContent';
import ActivityLogRoute from './Modules/ActivityLog/ActivityLogRoute';
import AddressRoute from './Modules/Address/AddressRoute';
import AdjustmentRoute from './Modules/Adjustment/AdjustmentRoute';
import AppMenuRoute from './Modules/AppMenu/AppMenuRoute';
import LoginRoute from './Modules/Login/LoginRoute';
import GlobalSettingRoute from './Modules/GlobalSetting/GlobalSettingRoute';
import MeasurementCategoryRoute from './Modules/MeasurementCategory/MeasurementCategoryRoute';
import MeasurementRoute from './Modules/Measurement/MeasurementRoute';
import MenuRoute from './Modules/Menu/MenuRoute';
import ProductCategoryRoute from './Modules/ProductCategory/ProductCategoryRoute';
import SequenceRoute from './Modules/Sequence/SequenceRoute';
import UserRoute from './Modules/User/UserRoute';
import ProductRoute from './Modules/Product/ProductRoute';
import CourierRoute from './Modules/Courier/CourierRoute';
import CurrencyRoute from './Modules/Currency/CurrencyRoute';
import CountryRoute from './Modules/Country/CountryRoute';
import ContactRoute from './Modules/Contact/ContactRoute';
import PaymentTermRoute from './Modules/PaymentTerm/PaymentTermRoute';
import SalesOrderRoute from './Modules/SalesOrder/SalesOrderRoute';
import LocationRoute from './Modules/Location/LocationRoute';
import WarehouseRoute from './Modules/Warehouse/WarehouseRoute';
import OperationTypeRoute from './Modules/OperationType/OperationTypeRoute';
import TransferRoute from './Modules/Transfer/TransferRoute';
import StockMovementRoute from './Modules/StockMovement/StockMovementRoute';
import MaterialRoute from './Modules/Material/MaterialRoute';
import RegionRoute from "./Modules/Region/RegionRoute";
import DeliveryFeeRoute from "./Modules/DeliveryFee/DeliveryFeeRoute";
import CityRoute from "./Modules/City/CityRoute";
import SourceRoute from "./Modules/Source/SourceRoute";
import HomeRoute from "./Modules/Home/HomeRoute";
import SalesOrderLineRoute from "./Modules/SalesOrderLine/SalesOrderLineRoute";
import {objectHasValue} from "./Helpers/object";
import {GET} from "./consts";
import useFetchHook from "./Hooks/useFetchHook";
import useFetchCatcherHook from "./Hooks/useFetchCatcherHook";
import GroupRoute from "./Modules/Group/GroupRoute"
import AccessRightRoute from "./Modules/AccessRight/AccessRightRoute"


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
                        <AccessRightRoute/>
                        <ActivityLogRoute/>
                        <AddressRoute/>
                        <AdjustmentRoute/>
                        <AppMenuRoute/>
                        <CityRoute/>
                        <ContactRoute/>
                        <CountryRoute/>
                        <CourierRoute/>
                        <CurrencyRoute/>
                        <DeliveryFeeRoute/>
                        <GlobalSettingRoute/>
                        <HomeRoute/>
                        <LocationRoute/>
                        <LoginRoute/>
                        <MaterialRoute/>
                        <MeasurementCategoryRoute/>
                        <MeasurementRoute/>
                        <MenuRoute/>
                        <OperationTypeRoute/>
                        <PaymentTermRoute/>
                        <ProductRoute/>
                        <ProductCategoryRoute/>
                        <RegionRoute/>
                        <SalesOrderRoute/>
                        <SalesOrderLineRoute/>
                        <SequenceRoute/>
                        <SourceRoute/>
                        <StockMovementRoute/>
                        <TransferRoute/>
                        <UserRoute/>
                        <GroupRoute/>
                        <WarehouseRoute/>
                    </AppContainerWithContent>
                </AppContextProvider>
            </BrowserRouter>
        )
    }
;

render(<App/>, document.getElementById('root'));

