import {Menu, Popconfirm} from "antd";
import React, {useContext} from "react";
import {TableContext} from "../../../Contexts/TableContext";
import {Link} from "react-router-dom";
import {toQueryString} from "../../../Helpers/url";

const ListExportButton = () => {
    const tableContext = useContext(TableContext);
    const params = toQueryString(tableContext.state.params);
    const manifest = tableContext.manifest;
    const exportLink = tableContext.exportLink ? `${tableContext.exportLink}/?${params}` : `${manifest.moduleName}/export?${params}`;
    return (
        <Menu.Item key={'exporter'}>
            <Popconfirm
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
        </Menu.Item>
    )
}

export default ListExportButton;
