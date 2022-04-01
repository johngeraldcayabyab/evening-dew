import '../css/App.scss';

import React, {useState, Suspense} from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {getCookie} from "./Helpers/cookie";

const AppContainerWithContent = React.lazy(() => import('./Components/AppContainterWithContent'));

const AddressRoute = React.lazy(() => import('./Modules/Address/AddressRoute'));
const AdjustmentRoute = React.lazy(() => import('./Modules/Adjustment/AdjustmentRoute'));
const AppMenuRoute = React.lazy(() => import('./Modules/AppMenu/AppMenuRoute'));
const LoginRoute = React.lazy(() => import('./Modules/Login/LoginRoute'));
const GlobalSettingRoute = React.lazy(() => import('./Modules/GlobalSetting/GlobalSettingRoute'));
const MeasurementCategoryRoute = React.lazy(() => import('./Modules/MeasurementCategory/MeasurementCategoryRoute'));
const MeasurementRoute = React.lazy(() => import('./Modules/Measurement/MeasurementRoute'));
const MenuRoute = React.lazy(() => import('./Modules/Menu/MenuRoute'));
const ProductCategoryRoute = React.lazy(() => import('./Modules/ProductCategory/ProductCategoryRoute'));
const SequenceRoute = React.lazy(() => import('./Modules/Sequence/SequenceRoute'));
const UserRoute = React.lazy(() => import('./Modules/User/UserRoute'));
const ProductRoute = React.lazy(() => import('./Modules/Product/ProductRoute'));
const CurrencyRoute = React.lazy(() => import('./Modules/Currency/CurrencyRoute'));
const CountryRoute = React.lazy(() => import('./Modules/Country/CountryRoute'));
const ContactRoute = React.lazy(() => import('./Modules/Contact/ContactRoute'));
const PaymentTermRoute = React.lazy(() => import('./Modules/PaymentTerm/PaymentTermRoute'));
const SalesOrderRoute = React.lazy(() => import('./Modules/SalesOrder/SalesOrderRoute'));
const LocationRoute = React.lazy(() => import('./Modules/Location/LocationRoute'));
const WarehouseRoute = React.lazy(() => import('./Modules/Warehouse/WarehouseRoute'));
const OperationTypeRoute = React.lazy(() => import('./Modules/OperationType/OperationTypeRoute'));
const TransferRoute = React.lazy(() => import('./Modules/Transfer/TransferRoute'));
const StockMovementRoute = React.lazy(() => import('./Modules/StockMovement/StockMovementRoute'));
const MaterialRoute = React.lazy(() => import('./Modules/Material/MaterialRoute'));


export const AppContext = React.createContext({});
export const AppContextProvider = AppContext.Provider;

const App = () => {
        const [appState, setAppState] = useState({
            isLogin: getCookie('Authorization'),
        });

        return (
            <Suspense fallback={<div>Loading...</div>}>
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
                            <SalesOrderRoute/>
                            <SequenceRoute/>
                            <StockMovementRoute/>
                            <TransferRoute/>
                            <UserRoute/>
                            <WarehouseRoute/>
                        </AppContainerWithContent>
                    </AppContextProvider>
                </BrowserRouter>
            </Suspense>
        )
    }
;

render(<App/>, document.getElementById('root'));

