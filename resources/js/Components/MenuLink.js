import {Menu} from "antd";
import React from "react";

const MenuItemLink = (props) => {
    return (
        <Menu.Item key={props.key}>
            <a href={props.href}>{props.label}</a>
        </Menu.Item>
    )
};

export default MenuItemLink;
