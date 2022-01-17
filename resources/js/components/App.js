import React, {useEffect, useState} from 'react';
import {render} from 'react-dom';
import {Layout} from "antd";
import {BrowserRouter} from 'react-router-dom';
import MeasurementCategoryRoute from "../MeasurementCategory/MeasurementCategoryRoute";
import MenuRoute from "../Menu/MenuRoute";
import {Content} from "antd/lib/layout/layout";
import MeasurementRoute from "../Measurement/MeasurementRoute";
import CustomMenu from "./CustomMenu";
import LoginRoute from "../Login/LoginRoute";
import {fetchGet} from "../Helpers/fetcher";


export const AppContext = React.createContext({});

export const AppContextProvider = AppContext.Provider;

const App = () => {
    const [appState, setAppState] = useState({
        isLogin: false
    });

    useEffect(async () => {

        const systemSettings = await fetchGet(`/api/system_settings`)
            .then(data => {
                return data;
            });

        console.log(systemSettings);
    });

    return (
        <BrowserRouter>
            <AppContextProvider value={{appState: appState, setAppState: setAppState}}>
                <Layout style={{height: '100%'}}>
                    <CustomMenu/>
                    <Content style={{marginTop: '50px'}}>
                        <LoginRoute/>
                        <MeasurementCategoryRoute/>
                        <MeasurementRoute/>
                        <MenuRoute/>
                    </Content>
                </Layout>
            </AppContextProvider>
        </BrowserRouter>
    )
};

render(
    <App/>
    , document.getElementById('root'));
