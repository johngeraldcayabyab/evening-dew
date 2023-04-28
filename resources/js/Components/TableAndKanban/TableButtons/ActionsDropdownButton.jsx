import {Dropdown, Menu, Popconfirm, Space} from "antd";
import ListDeleteButton from "./ListDeleteButton";
import {TableContext} from "../../../Contexts/TableContext";
import React, {useContext} from "react";
import ListExportButton from "./ListExportButton";

const ActionsDropdownButton = () => {
    const tableContext = useContext(TableContext);

    return(
        <Dropdown
            menu={{
                ,
            }}
        >
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    Hover me
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>
    )

    // const menu = (
    //     <Menu>
    //         <ListDeleteButton/>
    //         <ListExportButton/>
    //     </Menu>
    // );

    // if (tableContext.state.selectedRows.length) {
    //     return (
    //         <Dropdown.Button menu={[
    //             {
    //                 key: 'delete',
    //                 label: <Popconfirm
    //                     title={`Are you sure you want to delete the selected items?`}
    //                     okText="Yes"
    //                     cancelText="No" onConfirm={() => {
    //                     let ids = tableContext.state.selectedRows.map((row) => (row.id));
    //                     tableContext.handleMassDelete(ids);
    //                 }}
    //                 >
    //                     Delete
    //                 </Popconfirm>
    //             }
    //         ]}>Actions</Dropdown.Button>
    //     )
    // } else {
    //     return null;
    // }
}

export default ActionsDropdownButton;
