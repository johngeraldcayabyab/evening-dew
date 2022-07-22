import {Button, Menu, Popconfirm} from "antd";
import React, {useContext} from "react";
import {TableContext} from "../../Contexts/TableContext";
import {Link} from "react-router-dom";

const ListExportButton = () => {
    const listContext = useContext(TableContext);

    const params = Object.entries(listContext.tableState.params).map(e => e.join('=')).join('&');

    return (
        <Button
            htmlType={"button"}
            type={"primary"}
            size={'default'}
        >
            <Link to={`/${listContext.manifest.moduleName}/export?${params}`} target="_blank" rel="noopener noreferrer">
                Export
            </Link>
        </Button>
    )
}

export default ListExportButton;
