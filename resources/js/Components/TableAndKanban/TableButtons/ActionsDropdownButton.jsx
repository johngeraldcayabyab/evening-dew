import {Dropdown, Menu} from "antd";
import ListDeleteButton from "./ListDeleteButton";
import {TableContext} from "../../../Contexts/TableContext";
import {useContext} from "react";
import ListExportButton from "./ListExportButton";

const ActionsDropdownButton = () => {
    const listContext = useContext(TableContext);

    function handleMenuClick(e) {

    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <ListDeleteButton/>
            <ListExportButton/>
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
