import {Menu, Popconfirm} from "antd";
import React, {useContext} from "react";
import {TableContext} from "../../../Contexts/TableContext";
import {isShowButton} from "../../../Helpers/object"
import {DELETE_ACCESS} from "../../../consts"
import {AppContext} from "../../../Contexts/AppContext"

const ListDeleteButton = () => {
    const appContext = useContext(AppContext);
    const tableContext = useContext(TableContext);
    if (!isShowButton(appContext, tableContext.manifest.moduleName, DELETE_ACCESS)) {
        return null;
    }
    return (
        <Menu.Item key={'deleter'}>
            <Popconfirm
                title={`Are you sure you want to delete the selected items?`}
                okText="Yes"
                cancelText="No" onConfirm={() => {
                let ids = tableContext.state.selectedRows.map((row) => (row.id));
                tableContext.handleMassDelete(ids);
            }}
            >
                Delete
            </Popconfirm>
        </Menu.Item>
    )
}

export default ListDeleteButton;
