import {Button} from "antd";
import React from 'react';
import {Link} from 'react-router-dom';

const TableExportButton = (props) => {
    return (
        <Button
            htmlType={"submit"}
            type={"primary"}
            className={"custom-button"}
            size={'small'}
        >
            <Link to={`/${props.manifest.moduleName}/create`}>
                Export
            </Link>
        </Button>
    )
};

export default TableExportButton;
