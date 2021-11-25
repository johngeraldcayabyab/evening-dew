import {Menu, Dropdown} from "antd";

const ActionsDropdownButton = (props) => {
    function handleMenuClick(e) {
        console.log('click', e);
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1">1st item</Menu.Item>
            <Menu.Item key="2">2nd item</Menu.Item>
            <Menu.Item key="3">3rd item</Menu.Item>
        </Menu>
    );

    return (
        <Dropdown.Button overlay={menu}>Actions</Dropdown.Button>
    )
}
