import React, {useEffect, useState} from "react";
import {Header} from "antd/lib/layout/layout";
import {Menu, Skeleton} from "antd";
import {AppstoreOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {uuidv4} from "../Helpers/string";

const CustomMenu = () => {
    const [appState, setAppState] = useState({
        menus: [],
        loading: true
    });
    const [menus, setMenus] = useState([]);

    useEffect(async () => {
        let responseData = await fetch(`/api/menus`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => (data));
        setMenus(responseData);
        setAppState({
            menus: responseData,
            loading: false
        })
    }, []);

    return (
        <Skeleton loading={appState.loading} paragraph={{rows: 0, width: '100%'}} active>
            <Header style={{position: 'fixed', zIndex: 1, width: '100%', padding: 0}}>
                <Menu theme={'dark'} mode={'horizontal'}>
                    <Menu.Item key={uuidv4()}>
                        <AppstoreOutlined/>
                    </Menu.Item>
                    {menus.length && menus.map((menu) => {
                        return (
                            <Menu.Item key={menu.id}>
                                <Link to={menu.url}>{menu.label}</Link>
                            </Menu.Item>
                        );
                    })}
                </Menu>
            </Header>
        </Skeleton>
    );
}

export default CustomMenu;
