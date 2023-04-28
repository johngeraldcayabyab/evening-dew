import {Button, Dropdown, Popconfirm} from "antd";
import {TableContext} from "../../../Contexts/TableContext";
import React, {useContext} from "react";
import {DownOutlined} from "@ant-design/icons";
import {toQueryString} from "../../../Helpers/url";
import {Link} from "react-router-dom";

const ActionsDropdownButton = () => {
    const tableContext = useContext(TableContext);
    const params = toQueryString(tableContext.state.params);
    const exportLink = tableContext.exportLink ? `${tableContext.exportLink}/?${params}` : `${tableContext.manifest.moduleName}/export?${params}`;
    const items = [
        {
            key: 'delete',
            label: <Popconfirm
                title={`Are you sure you want to delete the selected items?`}
                okText="Yes"
                cancelText="No" onConfirm={() => {
                let ids = tableContext.state.selectedRows.map((row) => (row.id));
                tableContext.handleMassDelete(ids);
            }}
            >
                Delete
            </Popconfirm>
        },
        {
            key: 'export',
            label: <Popconfirm
                title={`Are you sure you want to export these items?`}
                okText={
                    <Link to={exportLink} target="_blank" rel="noopener noreferrer">
                        Yes
                    </Link>
                }
                cancelText="No"
            >
                Export
            </Popconfirm>
        }
    ];

    if (tableContext.state.selectedRows.length) {
        return (
            <Dropdown menu={{items}}>
                <Button>Actions <DownOutlined/></Button>
            </Dropdown>
        )
    } else {
        return null;
    }
}

export default ActionsDropdownButton;
