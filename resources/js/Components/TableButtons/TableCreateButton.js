import {Button} from "antd";
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {TableContext} from "../../Contexts/TableContext";
import {AppContext} from "../../App"

const TableCreateButton = () => {
    const appContext = useContext(AppContext);
    const listContext = useContext(TableContext);

    return (
        <Button
            htmlType={"submit"}
            type={"primary"}
            size={'default'}
        >
            <Link to={`/${listContext.manifest.displayName}/create`}>
                Create
            </Link>
        </Button>
    )
};

export default TableCreateButton;
