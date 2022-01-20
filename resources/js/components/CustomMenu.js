import React, {useContext, useEffect, useState} from "react";
import {Header} from "antd/lib/layout/layout";
import {Menu} from "antd";
import {AppstoreOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {uuidv4} from "../Helpers/string";
import {fetchGet} from "../Helpers/fetcher";
import {AppContext} from "./App";
import useFetchCatcher from "../Hooks/useFetchCatcher";
import useFetch from "../Hooks/useFetch";

const CustomMenu = () => {
    const fetchCatcher = useFetchCatcher();
    const appContext = useContext(AppContext);
    const [lefetch, abort] = useFetch();
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        console.log(appContext.appState);
        if (appContext.appState.isLogin) {
            console.log('WHY THE FUCK ARE YOU GETTING TRIGGERED');
            lefetch('/api/menus').then((response) => {
                setMenus(response.data);
                console.log(response, 'so it works');
            }).catch((responseErr) => {
                fetchCatcher.get(responseErr);
            });
        }
        return () => {
            if (appContext.appState.isLogin) {
                abort();
            }
        };
    }, []);

    useEffect(async () => {
        // if (appContext.appState.isLogin) {
        //     fetchGet('/api/menus').then(response => {
        //         setMenus(response.data);
        //     }).catch((responseErr) => {
        //         fetchCatcher.get(responseErr);
        //     });
        // }
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
