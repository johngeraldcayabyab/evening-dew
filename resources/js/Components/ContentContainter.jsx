import React, {useContext, useEffect} from "react";
import {Content} from "antd/es/layout/layout";
import CustomMenu from './CustomMenu';
import {Layout, message} from "antd";
import useFetchHook from "../Hooks/useFetchHook";
import {getCookie} from "../Helpers/cookie";
import {GET} from "../consts";
import {reset} from "../Helpers/reset";
import {useNavigate, useLocation, Outlet} from "react-router-dom";
import {AppContext} from "../Contexts/AppContext"

const ContentContainer = () => {
    const appContext = useContext(AppContext);
    const appState = appContext.appState;
    const setAppState = appContext.setAppState;
    const location = useLocation();
    const navigate = useNavigate();

    const useFetch = useFetchHook();

    useEffect(() => {
        // window.Echo.channel('refresh-browser').listen('RefreshBrowserEvent', () => {
        //     navigate.go(0);
        // });
        if (!appState.isLogin) {
            if (!location.pathname.includes('login')) {
                reset();
                message.warning('Please login first!'); // this thing does nothing because the state isnt fixed
                navigate('/login');
            }
            return;
        }
        const localStorageUser = localStorage.getItem("user");
        const localStorageAccessRights = localStorage.getItem("accessRights");
        const localStorageGlobalSettings = localStorage.getItem("globalSettings");
        if (localStorageUser && localStorageAccessRights) {
            setAppState(prevState => ({
                ...prevState,
                isLogin: getCookie('Authorization'),
                user: JSON.parse(localStorageUser),
                accessRights: JSON.parse(localStorageAccessRights),
                globalSettings: JSON.parse(localStorageGlobalSettings),
                appInitialLoad: false,
            }));
            return;
        }
        useFetch(`/api/users`, GET, {
            email: getCookie('userEmail'),
        }).then(userResponse => {
            useFetch(`/api/global_settings`, GET).then(globalSettings => {
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
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("accessRights", JSON.stringify(accessRights));
                localStorage.setItem("globalSettings", JSON.stringify(globalSettings));
                setAppState(prevState => ({
                    ...prevState,
                    isLogin: getCookie('Authorization'),
                    user: user,
                    accessRights: accessRights,
                    globalSettings: globalSettings,
                    appInitialLoad: false,
                }));
            });
        });
    }, [appState.isLogin]);

    return (
        <Layout style={{height: '100%', background: 'white'}}>
            {appState.isLogin && <CustomMenu/>}
            <Content style={{marginTop: '50px', borderTop: 'none'}}>
                <Outlet/>
            </Content>
        </Layout>
    )
};

export default ContentContainer;
