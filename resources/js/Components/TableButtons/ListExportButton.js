import {Menu, Popconfirm} from "antd";
import React, {useContext} from "react";
import {TableContext} from "../../Contexts/TableContext";
import {Link} from "react-router-dom";
import {toQueryString} from "../../Helpers/url";

const ListExportButton = () => {
    const listContext = useContext(TableContext);
    const params = toQueryString(listContext.tableState.params);
    const exportLink = listContext.exportLink ? `${listContext.exportLink}/?${params}` : `${listContext.manifest.moduleName}/export?${params}`;
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
