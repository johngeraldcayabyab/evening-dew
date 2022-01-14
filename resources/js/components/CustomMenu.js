import React, {useEffect, useState} from "react";
import {Header} from "antd/lib/layout/layout";
import {Menu, Skeleton} from "antd";
import {AppstoreOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {uuidv4} from "../Helpers/string";
import {getCookie} from "../Helpers/cookie";
import {fetchGet} from "../Helpers/fetcher";

const CustomMenu = () => {
    const [menus, setMenus] = useState([]);

    useEffect(async () => {
        if (getCookie('Authorization')) {
            let responseData = await fetchGet(`/api/menus`)
                .then(response => response.json())
                .then(responseJson => (responseJson.data));
            setMenus(responseData);
        }
    }, []);

    if (!getCookie('Authorization')) {
        return null;
    }

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
export default CustomMenu;
