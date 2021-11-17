import {Button} from "antd";
import React from 'react';
import {Link} from 'react-router-dom';

const TableUpdatedButton = (props) => {
    return (
        <Button
            htmlType={"submit"}
            type={"primary"}
            // className={"custom-button"}
            // size={'small'}
        >
            <Link to={`/${props.manifest.moduleName}/create`}>
                Upload
            </Link>
        </Button>
    )
};

export default TableUpdatedButton;
