import './bootstrap.js';
import React, {lazy, useEffect, useState} from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {getCookie} from "./Helpers/cookie";
import ContentContainer from './Components/ContentContainter';
import LoginRoute from './Modules/Login/LoginRoute';
import HomeRoute from "./Modules/Home/HomeRoute";
import {GET} from "./consts";
import useFetchHook from "./Hooks/useFetchHook";
import useFetchCatcherHook from "./Hooks/useFetchCatcherHook";
import {Layout, message} from "antd"
import {reset} from "./Helpers/reset"
import {useHistory} from "react-router"

export const AppContext = React.createContext({});
export const AppContextProvider = AppContext.Provider;
const Routerist = lazy(() => import("./Routerist"));


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
        if (appState.isLogin) {
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
        } else {
            if (!window.location.href.includes('login')) {
                message.warning('Please login first!'); // this thing does nothing because the state isnt fixed
                window.location.href = '/login';
            }
        }
    }, [appState.isLogin]);

    return (
        <BrowserRouter>
            <AppContextProvider
                value={{
                    appState: appState,
                    setAppState: setAppState
                }}
            >
                <Layout style={{height: '100%', background: '#f6f7fa'}}>
                    <ContentContainer>
                        <React.Suspense fallback={<></>}>
                            <Routerist/>
                        </React.Suspense>
                        <HomeRoute/>
                        <LoginRoute/>
                    </ContentContainer>
                </Layout>
            </AppContextProvider>
        </BrowserRouter>
    )
};

render(<App/>, document.getElementById('root'));

