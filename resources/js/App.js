import '../css/App.scss';

import React, {useEffect, useState} from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Content} from "antd/lib/layout/layout";
import AppContainer from "./components/AppContainer";
import CustomMenu from "./components/CustomMenu";
import GlobalSettingRoute from "./App/GlobalSetting/GlobalSettingRoute";
import LoginRoute from "./App/Login/LoginRoute";
import MeasurementCategoryRoute from "./App/MeasurementCategory/MeasurementCategoryRoute";
import MeasurementRoute from "./App/Measurement/MeasurementRoute";
import MenuRoute from "./App/Menu/MenuRoute";
import ProductCategoryRoute from "./App/ProductCategory/ProductCategoryRoute";
import SequenceRoute from "./App/Sequence/SequenceRoute";
import UserRoute from "./App/User/UserRoute";
import {getCookie} from "./Helpers/cookie";
import ProductRoute from "./App/Product/ProductRoute";
import CurrencyRoute from "./App/Currency/CurrencyRoute";
import CountryRoute from "./App/Country/CountryRoute";
import AddressRoute from "./App/Address/AddressRoute";
import ContactRoute from "./App/Contact/ContactRoute";
import PaymentTermRoute from "./App/PaymentTerm/PaymentTermRoute";
import SalesOrderRoute from "./App/SalesOrder/SalesOrderRoute";
import LocationRoute from "./App/Location/LocationRoute";
import WarehouseRoute from "./App/Warehouse/WarehouseRoute";
import OperationTypeRoute from "./App/OperationType/OperationTypeRoute";
import TransferRoute from "./App/Transfer/TransferRoute";
import StockMovementRoute from "./App/StockMovement/StockMovementRoute";
import AppMenuRoute from "./App/AppMenu/AppMenuRoute";
import MaterialRoute from "./App/Material/MaterialRoute";

export const AppContext = React.createContext({});
export const AppContextProvider = AppContext.Provider;

const App = () => {
    const [appState, setAppState] = useState({
        isLogin: getCookie('Authorization'),
    });

    useEffect(() => {
    });

    return (
        <BrowserRouter>
            <AppContextProvider value={{appState: appState, setAppState: setAppState}}>
                <AppContainer>
                    <CustomMenu/>
                    <Content style={{marginTop: '50px', borderTop: 'none'}}>
                        <AddressRoute/>
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
                        <SalesOrderRoute/>
                        <SequenceRoute/>
                        <StockMovementRoute/>
                        <TransferRoute/>
                        <UserRoute/>
                        <WarehouseRoute/>
                    </Content>
                </AppContainer>
            </AppContextProvider>
        </BrowserRouter>
    )
};

render(<App/>, document.getElementById('root'));

