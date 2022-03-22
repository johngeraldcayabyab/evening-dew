import {Dropdown, Menu} from "antd";
import ListDeleteButton from "./ListDeleteButton";
import {ListContext} from "../../Contexts/ListContext";
import {useContext} from "react";

const ActionsDropdownButton = () => {
    const listContext = useContext(ListContext);

    function handleMenuClick(e) {

    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <ListDeleteButton/>
        </Menu>
    );

    if (listContext.tableState.selectedRows.length) {
        return (
            <Dropdown.Button overlay={menu}>Actions</Dropdown.Button>
        )
    } else {
        return null;
    }
}

export default ActionsDropdownButton;
