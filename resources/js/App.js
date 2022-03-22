import '../css/App.scss';

import React, {useState} from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Content} from "antd/lib/layout/layout";
import AppContainer from "./Components/AppContainer";
import CustomMenu from "./Components/CustomMenu";
import GlobalSettingRoute from "./Modules/GlobalSetting/GlobalSettingRoute";
import LoginRoute from "./Modules/Login/LoginRoute";
import MeasurementCategoryRoute from "./Modules/MeasurementCategory/MeasurementCategoryRoute";
import MeasurementRoute from "./Modules/Measurement/MeasurementRoute";
import MenuRoute from "./Modules/Menu/MenuRoute";
import ProductCategoryRoute from "./Modules/ProductCategory/ProductCategoryRoute";
import SequenceRoute from "./Modules/Sequence/SequenceRoute";
import UserRoute from "./Modules/User/UserRoute";
import {getCookie} from "./Helpers/cookie";
import ProductRoute from "./Modules/Product/ProductRoute";
import CurrencyRoute from "./Modules/Currency/CurrencyRoute";
import CountryRoute from "./Modules/Country/CountryRoute";
import AddressRoute from "./Modules/Address/AddressRoute";
import ContactRoute from "./Modules/Contact/ContactRoute";
import PaymentTermRoute from "./Modules/PaymentTerm/PaymentTermRoute";
import SalesOrderRoute from "./Modules/SalesOrder/SalesOrderRoute";
import LocationRoute from "./Modules/Location/LocationRoute";
import WarehouseRoute from "./Modules/Warehouse/WarehouseRoute";
import OperationTypeRoute from "./Modules/OperationType/OperationTypeRoute";
import TransferRoute from "./Modules/Transfer/TransferRoute";
import StockMovementRoute from "./Modules/StockMovement/StockMovementRoute";
import AppMenuRoute from "./Modules/AppMenu/AppMenuRoute";
import MaterialRoute from "./Modules/Material/MaterialRoute";

export const AppContext = React.createContext({});
export const AppContextProvider = AppContext.Provider;

const App = () => {
    const [appState, setAppState] = useState({
        isLogin: getCookie('Authorization'),
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

