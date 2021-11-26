import {Menu, Popconfirm} from "antd";
import React from "react";
import {uuidv4} from "../../Helpers/string";

const ListDeleteButton = (props) => {
    return (
        <Menu.Item key={'deleter'}>
            <Popconfirm title={`Are you sure you want to delete the selected items?`} okText="Yes"
                        cancelText="No" onConfirm={() => {
                // tableActions.handleDelete(data.id);
            }}>
                Delete
            </Popconfirm>
        </Menu.Item>
    )
}

export default ListDeleteButton;
