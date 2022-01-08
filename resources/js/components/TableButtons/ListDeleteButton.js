import {Menu, Popconfirm} from "antd";
import React from "react";

const ListDeleteButton = (props) => {
    return (
        <Menu.Item key={'deleter'}>
            <Popconfirm
                title={`Are you sure you want to delete the selected items?`}
                okText="Yes"
                cancelText="No" onConfirm={() => {
                let ids = props.selectedRows.map((row) => (row.id));
                props.handleMassDelete(ids);
            }}
            >
                Delete
            </Popconfirm>
        </Menu.Item>
    )
}

export default ListDeleteButton;
