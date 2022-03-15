import React, {useContext, useEffect, useState} from "react";
import {Header} from "antd/lib/layout/layout";
import {Avatar, Menu, message} from "antd";
import {AppstoreOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import useFetchCatcher from "../Hooks/useFetchCatcher";
import useFetchHook from "../Hooks/useFetchHook";
import {GET, POST} from "../consts";
import {eraseCookie} from "../Helpers/cookie";
import {useHistory} from "react-router";
import {AppContext} from "../App";
import {setBreadcrumbs, setClickedBreadcrumb} from "../Helpers/breadcrumbs";
import {replaceUnderscoreWithSpace, titleCase, uuidv4} from "../Helpers/string";

const {SubMenu} = Menu;

function makeMenu(menus) {
    return menus.map((menu) => {
        if (menu.children.length) {
            return (
                <SubMenu key={`sub-menu-${menu.id}`} title={menu.label}>
                    {menu.children.map((child) => {
                        return (
                            <Menu.Item key={`sub-menu-child-${child.id}`}>
                                {child.menu_id ? <Link to={child.menu.url}>{child.label}</Link> : child.label}
                            </Menu.Item>
                        );
                    })}
                </SubMenu>
            )
        }
        return (
            <Menu.Item key={`menu-${menu.id}`}>
                {menu.menu_id ? <Link to={menu.menu.url}>{menu.label}</Link> : menu.label}
            </Menu.Item>
        );
    })
}

const CustomMenu = () => {
    const fetchCatcher = useFetchCatcher();
    const appContext = useContext(AppContext);
    const [useFetch, fetchAbort] = useFetchHook();
    const [state, setState] = useState({
        appMenu: [],
        appMenuChildren: [],
    });
    const history = useHistory();

    useEffect(() => {
        if (appContext.appState.isLogin) {
            useFetch('/api/app_menus/1', GET).then((response) => {
                setState((prevState) => ({
                    ...prevState,
                    appMenu: response.children
                }));
            }).catch((responseErr) => {
                fetchCatcher.get(responseErr);
            });
        }
        return () => {
            if (appContext.appState.isLogin) {
                fetchAbort();
            }
        };
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

    if (appContext.appState.isLogin) {
        return (
            <Header
                style={{position: 'fixed', zIndex: 1, width: '100%', padding: 0, height: '50px', lineHeight: '50px'}}>
                <Menu theme={'dark'} mode={'horizontal'} onClick={handleClick}>
                    <SubMenu key="app-menu" icon={<AppstoreOutlined/>} title={''}>
                        {state.appMenu.map((menu) => {
                            return (
                                <Menu.Item key={`parent-${menu.id}`}>
                                    {
                                        menu.menu ?
                                            <Link to={menu.menu.url} onClick={() => {
                                                let pathname = menu.menu.url;
                                                let splitPathName = pathname.split('/');
                                                setClickedBreadcrumb({});
                                                setBreadcrumbs([{
                                                    key: uuidv4(),
                                                    slug: titleCase(replaceUnderscoreWithSpace(splitPathName[1])),
                                                    link: menu.menu.url
                                                }]);
                                            }}>{menu.label}</Link>
                                            : menu.label
                                    }
                                </Menu.Item>
                            );
                        })}
                    </SubMenu>

                    {makeMenu(state.appMenuChildren)}

                    <Menu.SubMenu
                        title={
                            <React.Fragment>
                                <Avatar><UserOutlined/></Avatar>
                            </React.Fragment>
                        }
                        className={'top-nav-avatar'}
                        key={'menu-profile-sub-menu'}
                    >
                        <Menu.Item key="menu-profile">
                            <a href="#">Profile</a>
                        </Menu.Item>
                        <Menu.Item key="menu-activity-logs">
                            <a href="#">Activity Logs</a>
                        </Menu.Item>
                        <Menu.Divider/>
                        <Menu.Item key="menu-logout" onClick={() => {
                            useFetch('/api/logout', POST).then((response) => {
                                eraseCookie('Authorization');
                                appContext.setAppState((prevState) => ({
                                    ...prevState,
                                    isLogin: false,
                                }));
                                history.push('/login');
                                message.success('Logged Out!');
                            }).catch((responseErr) => {
                                fetchCatcher.get(responseErr);
                            });
                        }}>Log out</Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </Header>
        );
    }
    return null;
}
export default CustomMenu;
