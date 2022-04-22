// import '../css/App.scss';

import React, {useState, Suspense} from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {getCookie} from "./Helpers/cookie";
import {Spin} from "antd";

import AppContainerWithContent from './Components/AppContainterWithContent';
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


export const AppContext = React.createContext({});
export const AppContextProvider = AppContext.Provider;

const App = () => {
        const [appState, setAppState] = useState({
            isLogin: getCookie('Authorization'),
        });

        return (
            <BrowserRouter>
                <AppContextProvider value={{appState: appState, setAppState: setAppState}}>
                    <AppContainerWithContent>
                        <AddressRoute/>
                        <AdjustmentRoute/>
                        <AppMenuRoute/>
                        <ContactRoute/>
                        <CountryRoute/>
                        <CurrencyRoute/>
                        <GlobalSettingRoute/>
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
                        <SequenceRoute/>
                        <StockMovementRoute/>
                        <TransferRoute/>
                        <UserRoute/>
                        <WarehouseRoute/>
                    </AppContainerWithContent>
                </AppContextProvider>
            </BrowserRouter>
        )
    }
;

render(<App/>, document.getElementById('root'));

