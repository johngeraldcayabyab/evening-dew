import React, {useContext, useEffect, useState} from "react";
import {Header} from "antd/lib/layout/layout";
import {Avatar, Menu, message} from "antd";
import {AppstoreOutlined, UserOutlined} from "@ant-design/icons";
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

const {SubMenu} = Menu;

function resetBreadcrumbs(url) {
    let splitPathName = url.split('/');
    setClickedBreadcrumb({});
    setBreadcrumbs([{
        key: uuidv4(),
        slug: titleCase(replaceUnderscoreWithSpace(splitPathName[1])),
        link: url
    }]);
}

function makeMenu(menus) {
    return menus.map((menu) => {
        if (menu.children.length) {
            return (
                <SubMenu key={`sub-menu-${menu.id}`} title={menu.label}>
                    {menu.children.map((child) => {
                        return (
                            <Menu.Item key={`sub-menu-child-${child.id}`}>
                                {child.menu_id ? <Link to={child.menu.url} onClick={() => {
                                    resetBreadcrumbs(child.menu.url);
                                }}>{child.label}</Link> : child.label}
                            </Menu.Item>
                        );
                    })}
                </SubMenu>
            )
        }
        return (
            <Menu.Item key={`menu-${menu.id}`}>
                {menu.menu_id ? <Link to={menu.menu.url} onClick={() => {
                    resetBreadcrumbs(menu.menu.url);
                }}>{menu.label}</Link> : menu.label}
            </Menu.Item>
        );
    })
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
                    // console.log(index, appMenu);
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

    function handleClick(click) {
        if (click.key.includes('parent')) {
            const id = parseInt(click.key.replace('parent-', ''));
            const index = state.appMenu.findIndex(m => m.id === id);
            setState((prevState) => ({
                ...prevState,
                appMenuChildren: state.appMenu[index].children
            }));
        }
    }

    function onLogout() {
        useFetch('/api/logout', POST).then((response) => {
            eraseCookie('Authorization');
            appContext.setAppState((prevState) => ({
                ...prevState,
                isLogin: false,
            }));
            setBreadcrumbs([]);
            setAppMenu({});
            setClickedBreadcrumb({});
            history.push('/login');
            message.success('Logged Out!');
        }).catch((responseErr) => {
            fetchCatcher.get(responseErr);
        });
    }

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
                <Menu theme={'dark'} mode={'horizontal'} onClick={handleClick}>
                    <SubMenu key="app-menu" icon={<AppstoreOutlined/>} title={''}>
                        {state.appMenu.map((menu) =>
                            <Menu.Item key={`parent-${menu.id}`} onClick={() => {
                                if (menu.menu) {
                                    resetBreadcrumbs(menu.menu.url);
                                    setAppMenu(menu);
                                }
                            }}>
                                {menu.menu ?
                                    <Link to={menu.menu.url}>{menu.label}</Link>
                                    : menu.label}
                            </Menu.Item>
                        )}
                    </SubMenu>

                    {makeMenu(state.appMenuChildren)}

                    <Menu.SubMenu
                        title={<AvatarUser/>}
                        className={'top-nav-avatar'}
                        key={'menu-profile-sub-menu'}
                    >
                        <Menu.Item key={`menu-profile`}>
                            Profile
                        </Menu.Item>
                        <Menu.Item key={`menu-activity-logs`}>
                            Activity Logs
                        </Menu.Item>
                        <Menu.Divider/>
                        <Menu.Item key={`menu-logout`} onClick={() => onLogout()}>
                            Logout
                        </Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </Header>
        );
    }
    return null;
}
export default CustomMenu;
