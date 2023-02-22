import './bootstrap.js';
import React, {lazy, useState} from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {getCookie} from "./Helpers/cookie";
import ContentContainer from './Components/ContentContainter';
import LoginRoute from './Modules/Login/LoginRoute';
import HomeRoute from "./Modules/Home/HomeRoute";

export const AppContext = React.createContext({});
export const AppContextProvider = AppContext.Provider;
const RouteMaster = lazy(() => import("./RouteMaster"));


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

