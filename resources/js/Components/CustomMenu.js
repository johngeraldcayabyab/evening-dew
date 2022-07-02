import React, {useContext, useEffect, useState} from "react";
import {Header} from "antd/lib/layout/layout";
import {Menu, message} from "antd";
import {AppstoreOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import useFetchCatcherHook from "../Hooks/useFetchCatcherHook";
import useFetchHook from "../Hooks/useFetchHook";
import {GET, POST} from "../consts";
import {eraseCookie} from "../Helpers/cookie";
import {useHistory} from "react-router";
import {AppContext} from "../App";
import {setBreadcrumbs, setClickedBreadcrumb} from "../Helpers/breadcrumbs";
import {replaceUnderscoreWithSpace, titleCase, uuidv4} from "../Helpers/string";
import {getAppMenu, setAppMenu} from "../Helpers/app_menu";
import {objectHasValue} from "../Helpers/object";
import AvatarUser from "./AvatarUser";
import {setUser} from "../Helpers/user_helpers";

function resetBreadcrumbs(url) {
    let splitPathName = url.split('/');
    setClickedBreadcrumb({});
    setBreadcrumbs([{
        key: uuidv4(),
        slug: titleCase(replaceUnderscoreWithSpace(splitPathName[1])),
        link: url
    }]);
}

const CustomMenu = () => {
    const fetchCatcher = useFetchCatcherHook();
    const appContext = useContext(AppContext);
    const useFetch = useFetchHook();
    const [state, setState] = useState({
        appMenu: [],
        appMenuChildren: [],
    });
    const history = useHistory();

    useEffect(() => {
        if (appContext.appState.isLogin) {
            useFetch('/api/app_menus/1', GET).then((response) => {
                const currentAppMenu = getAppMenu();
                if (objectHasValue(currentAppMenu)) {
                    const appMenu = response.children;
                    const index = appMenu.findIndex(m => m.id === currentAppMenu.id);
                    setState((prevState) => ({
                        ...prevState,
                        appMenu: appMenu,
                        appMenuChildren: appMenu[index].children
                    }));
                } else {
                    setState((prevState) => ({
                        ...prevState,
                        appMenu: response.children
                    }));
                }
            }).catch((responseErr) => {
                fetchCatcher.get(responseErr);
            });
        }
    }, [appContext.appState.isLogin]);

    function onLogout() {
        useFetch('/api/logout', POST).then((response) => {
            eraseCookie('Authorization');
            appContext.setAppState((prevState) => ({
                ...prevState,
                isLogin: false,
            }));
            setBreadcrumbs([]);
            setAppMenu({});
            setUser({});
            setClickedBreadcrumb({});
            history.push('/login');
            message.success('Logged Out!');
        }).catch((responseErr) => {
            fetchCatcher.get(responseErr);
        });
    }

    const sectionMenu = state.appMenuChildren.map((menu) => {
        if (menu.children.length) {
            return {
                label: menu.label,
                key: `section-menu-${menu.id}`,
                children: menu.children.map((child) => ({
                    label: child.menu_id ?
                        <Link
                            to={child.menu.url}
                            onClick={() => {
                                resetBreadcrumbs(child.menu.url);
                            }}>
                            {child.label}
                        </Link>
                        : child.label,
                    key: `section-menu-child-${child.id}`
                }))
            }
        }
        return {
            label: menu.menu_id ? <Link to={menu.menu.url}>{menu.label}</Link> : menu.label,
            key: `section-menu-${menu.id}`,
            onClick: () => {
                resetBreadcrumbs(menu.menu.url);
            }
        }
    });

    const items = [
        {
            label: '',
            key: 'app-menu',
            icon: <AppstoreOutlined/>,
            children: state.appMenu.map((appMenu) => ({
                label: <Link to={appMenu.menu.url}>{appMenu.label}</Link>,
                key: `app-menu-${appMenu.id}`,
                onClick: () => {
                    const index = state.appMenu.findIndex(m => m.id === appMenu.id);
                    resetBreadcrumbs(appMenu.menu.url);
                    setAppMenu(appMenu);
                    setState((prevState) => ({
                        ...prevState,
                        appMenuChildren: state.appMenu[index].children
                    }));
                }
            })),
        },
        ...sectionMenu,
        {
            label: '',
            key: 'systray-menu',
            icon: <AvatarUser/>,
            className: 'top-nav-avatar',
            children: [
                {
                    label: 'Profile'
                },
                {
                    label: 'Activity Logs'
                },
                {
                    label: 'Logout',
                    onClick: () => {
                        onLogout()
                    }
                },
            ]
        },
    ];

    if (appContext.appState.isLogin) {
        return (
            <Header
                style={{
                    position: 'fixed',
                    zIndex: 1,
                    width: '100%',
                    padding: 0,
                    height: '50px',
                    lineHeight: '50px'
                }}
            >
                <Menu theme={'dark'} mode={'horizontal'} items={items}/>
            </Header>
        );
    }
    return null;
}
export default CustomMenu;
