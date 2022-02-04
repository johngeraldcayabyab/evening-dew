import React, {useContext, useEffect, useState} from "react";
import {Header} from "antd/lib/layout/layout";
import {Avatar, Menu, message} from "antd";
import {AppstoreOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {uuidv4} from "../Helpers/string";
import {AppContext} from "./App";
import useFetchCatcher from "../Hooks/useFetchCatcher";
import useFetchHook from "../Hooks/useFetchHook";
import {GET, POST} from "../consts";
import {eraseCookie} from "../Helpers/cookie";
import {useHistory} from "react-router";

const CustomMenu = () => {
    const fetchCatcher = useFetchCatcher();
    const appContext = useContext(AppContext);
    const [useFetch, fetchAbort] = useFetchHook();
    const [menus, setMenus] = useState([]);
    const history = useHistory();

    useEffect(() => {
        if (appContext.appState.isLogin) {
            useFetch('/api/menus', GET).then((response) => {
                setMenus(response.data);
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


    if (appContext.appState.isLogin) {
        return (
            <Header
                style={{position: 'fixed', zIndex: 1, width: '100%', padding: 0, height: '50px', lineHeight: '50px'}}>
                <Menu theme={'dark'} mode={'horizontal'}>
                    <Menu.Item key={uuidv4()}>
                        <AppstoreOutlined/>
                    </Menu.Item>
                    {menus.map((menu) => {
                        return (
                            <Menu.Item key={menu.id}>
                                <Link to={menu.url}>{menu.label}</Link>
                            </Menu.Item>
                        );
                    })}

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
