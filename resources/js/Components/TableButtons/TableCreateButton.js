import {Button} from "antd";
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {ListContext} from "../../Contexts/ListContext";

const TableCreateButton = () => {
    const listContext = useContext(ListContext);

    return (
        <Button
            htmlType={"submit"}
            type={"primary"}
            size={'default'}
        >
            <Link to={`/${listContext.manifest.moduleName}/create`}>
                Create
            </Link>
        </Button>
    )
};

export default TableCreateButton;
