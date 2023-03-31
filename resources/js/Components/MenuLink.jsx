import {Menu} from "antd";
import React from "react";
import {Link} from "react-router-dom";

const MenuLink = (props) => {
    return (
        <Menu.Item key={props.key} onClick={props.onClick}>
            {props.to ?
                <Link to={props.to}>{props.label}</Link>
                : props.label}
        </Menu.Item>
    )
};

export default MenuLink;
