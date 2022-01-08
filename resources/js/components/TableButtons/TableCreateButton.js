import {Button} from "antd";
import React from 'react';
import {Link} from 'react-router-dom';

const TableCreateButton = (props) => {
    return (
        <Button
            htmlType={"submit"}
            type={"primary"}
            size={'default'}
        >
            <Link to={`/${props.manifest.moduleName}/create`}>
                Create
            </Link>
        </Button>
    )
};

export default TableCreateButton;
