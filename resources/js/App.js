import '../css/App.scss';

import React, {useEffect, useState} from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Content} from "antd/lib/layout/layout";
import AppContainer from "./components/AppContainer";
import CustomMenu from "./components/CustomMenu";
import GlobalSettingRoute from "./GlobalSetting/GlobalSettingRoute";
import LoginRoute from "./Login/LoginRoute";
import MeasurementCategoryRoute from "./MeasurementCategory/MeasurementCategoryRoute";
import MeasurementRoute from "./Measurement/MeasurementRoute";
import MenuRoute from "./Menu/MenuRoute";
import ProductCategoryRoute from "./ProductCategory/ProductCategoryRoute";
import SequenceRoute from "./Sequence/SequenceRoute";
import UserRoute from "./User/UserRoute";
import {getCookie} from "./Helpers/cookie";
import ProductRoute from "./Product/ProductRoute";

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
                        <GlobalSettingRoute/>
                        <LoginRoute/>
                        <MeasurementCategoryRoute/>
                        <MeasurementRoute/>
                        <MenuRoute/>
                        <ProductRoute/>
                        <ProductCategoryRoute/>
                        <SequenceRoute/>
                        <UserRoute/>
                    </Content>
                </AppContainer>
            </AppContextProvider>
        </BrowserRouter>
    )
};

render(<App/>, document.getElementById('root'));

