import {Menu} from "antd";
import React from "react";
import {Link} from "react-router-dom";

const MenuLink = (props) => {
    return (
        <Menu.Item key={props.key}>
            <Link to={props.to}>{props.label}</Link>
        </Menu.Item>
    )
};

export default MenuLink;
