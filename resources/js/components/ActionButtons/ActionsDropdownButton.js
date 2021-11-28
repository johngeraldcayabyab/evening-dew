import {Menu, Dropdown} from "antd";
import ListDeleteButton from "./ListDeleteButton";

const ActionsDropdownButton = (props) => {

    function handleMenuClick(e) {
        // console.log('click', e);
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
