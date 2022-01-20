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
import {getCookie} from "../Helpers/cookie";


export const AppContext = React.createContext({});
export const AppContextProvider = AppContext.Provider;

const App = () => {
    const [appState, setAppState] = useState({
        isLogin: getCookie('Authorization'),
    });

    useEffect(async () => {
        // const systemSettings = await fetchGet(`/api/system_settings`)
        //     .then(data => {
        //         return data;
        //     }).catch(response => {
        //         fetchCatcher.get(response);
        //         // if (response.status === 401) {
        //         //     history.push('/login')
        //         // } else if (response.status === 403) {
        //         //     message.error('You cant do this action! Please ask your admin for permission');
        //         // }
        //         // console.log(response.status, 'eggira');
        //     });
        // console.log(systemSettings);
    });

    return (
        <BrowserRouter>
            <AppContextProvider value={{appState: appState, setAppState: setAppState}}>
                <Layout style={{height: '100%', background: '#ffffff'}}>
                    <CustomMenu/>
                    <Content style={{marginTop: '50px', borderTop: 'none'}}>
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
