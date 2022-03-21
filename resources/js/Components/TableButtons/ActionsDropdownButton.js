import {Dropdown, Menu} from "antd";
import ListDeleteButton from "./ListDeleteButton";

const ActionsDropdownButton = (props) => {

    function handleMenuClick(e) {

    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <ListDeleteButton {...props}/>
        </Menu>
    );

    if (props.selectedRows.length) {
        return (
            <Dropdown.Button overlay={menu}>Actions</Dropdown.Button>
        )
    } else {
        return null;
    }
}

export default ActionsDropdownButton;
