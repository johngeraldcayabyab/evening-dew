import "antd/dist/antd.min.css";
import "../sass/App.scss";
import './bootstrap.js';
import React, {useState} from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {getCookie} from "./Helpers/cookie";
import ContentContainer from './Components/ContentContainter';
import LoginRoute from './Modules/Login/LoginRoute';
import HomeRoute from "./Modules/Home/HomeRoute";
import {AppContextProvider} from "./Contexts/AppContext";
import RouteMaster from "./RouteMaster";

const App = () => {
    const [appState, setAppState] = useState({
        isLogin: getCookie('Authorization'),
        userEmail: getCookie('userEmail'),
        appInitialLoad: true,
        user: {},
        globalSetting: {},
    });

    return (
        <BrowserRouter>
            <AppContextProvider
                value={{
                    appState: appState,
                    setAppState: setAppState
                }}
            >
                <ContentContainer>
                    <React.Suspense fallback={<></>}>
                        <RouteMaster/>
                    </React.Suspense>
                    <HomeRoute/>
                    <LoginRoute/>
                </ContentContainer>
            </AppContextProvider>
        </BrowserRouter>
    )
};

render(<App/>, document.getElementById('root'));

