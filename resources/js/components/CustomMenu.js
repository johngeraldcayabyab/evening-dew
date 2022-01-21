import React, {useContext, useEffect, useState} from "react";
import {Header} from "antd/lib/layout/layout";
import {Menu} from "antd";
import {AppstoreOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {uuidv4} from "../Helpers/string";
import {AppContext} from "./App";
import useFetchCatcher from "../Hooks/useFetchCatcher";
import useFetchHook from "../Hooks/useFetchHook";
import {GET} from "../consts";

const CustomMenu = () => {
    const fetchCatcher = useFetchCatcher();
    const appContext = useContext(AppContext);
    const [useFetch, fetchAbort] = useFetchHook();
    const [menus, setMenus] = useState([]);

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
    }, []);

    if (appContext.appState.isLogin) {
        return (
            <Header style={{position: 'fixed', zIndex: 1, width: '100%', padding: 0, height: '50px', lineHeight: '50px'}}>
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
                </Menu>
            </Header>
        );
    }
    return null;
}
export default CustomMenu;
