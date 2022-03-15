import {Button} from "antd";
import React from 'react';
import {Link} from 'react-router-dom';

const TableExportButton = (props) => {
    return (
        <Button
            htmlType={"submit"}
            type={"primary"}
            size={'default'}
        >
            <Link to={`/${props.manifest.moduleName}/create`}>
                Export
            </Link>
        </Button>
    )
};

export default TableExportButton;
