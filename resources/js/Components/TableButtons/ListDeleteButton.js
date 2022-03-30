import {Menu, Popconfirm} from "antd";
import React, {useContext} from "react";
import {ListContext} from "../../Contexts/ListContext";

const ListDeleteButton = () => {
    const listContext = useContext(ListContext);

    return (
        <Menu.Item key={'deleter'}>
            <Popconfirm
                title={`Are you sure you want to delete the selected items?`}
                okText="Yes"
                cancelText="No" onConfirm={() => {
                let ids = listContext.tableState.selectedRows.map((row) => (row.id));
                listContext.tableActions.handleMassDelete(ids);
            }}
            >
                Delete
            </Popconfirm>
        </Menu.Item>
    )
}

export default ListDeleteButton;
