import React, {useContext, useEffect} from "react";
import {Content} from "antd/es/layout/layout";
import CustomMenu from './CustomMenu';
import {Layout, message} from "antd";
import useFetchHook from "../Hooks/useFetchHook";
import useFetchCatcherHook from "../Hooks/useFetchCatcherHook";
import {getCookie} from "../Helpers/cookie";
import {GET} from "../consts";
import {reset} from "../Helpers/reset";
import {AppContext} from "../App";
import {useHistory, useLocation} from "react-router";

const ContentContainer = (props) => {
    const appContext = useContext(AppContext);
    const appState = appContext.appState;
    const setAppState = appContext.setAppState;
    const location = useLocation();
    const history = useHistory();

    const useFetch = useFetchHook();
    const fetchCatcher = useFetchCatcherHook();

    useEffect(() => {
        window.Echo.channel('refresh-browser').listen('RefreshBrowserEvent', () => {
            history.go(0);
        });
        if (!appState.isLogin) {
            if (!location.pathname.includes('login')) {
                reset();
                message.warning('Please login first!'); // this thing does nothing because the state isnt fixed
                history.push('/login');
            }
            return;
        }

        const user = localStorage.getItem("user");
        const accessRights = localStorage.getItem("accessRights");
        const globalSetting = localStorage.getItem("globalSetting");
        if (user && accessRights && globalSetting) {
            setAppState(prevState => ({
                ...prevState,
                isLogin: getCookie('Authorization'),
                user: JSON.parse(user),
                accessRights: JSON.parse(accessRights),
                globalSetting: JSON.parse(globalSetting),
                appInitialLoad: false,
            }));
            return;
        }

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
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("accessRights", JSON.stringify(accessRights));
                localStorage.setItem("globalSetting", JSON.stringify(globalSettingResponse));
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
            if (responseErr.status === 401) {
                reset();
                setAppState(prevState => ({
                    ...prevState,
                    isLogin: false,
                    accessRights: false,
                    userEmail: false,
                    globalSetting: {},
                    user: {},
                    appInitialLoad: true,
                }));
            }
            fetchCatcher.get(responseErr);
        });
    }, [appState.isLogin]);

    return (
        <Layout style={{height: '100%', background: '#f6f7fa'}}>
            {appState.isLogin && <CustomMenu/>}
            <Content style={{marginTop: '50px', borderTop: 'none'}}>
                {props.children}
            </Content>
        </Layout>
    )
};

export default ContentContainer;
