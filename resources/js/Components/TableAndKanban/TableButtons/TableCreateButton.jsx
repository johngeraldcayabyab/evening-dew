import {Button} from "antd";
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {TableContext} from "../../../Contexts/TableContext";
import {isShowButton} from "../../../Helpers/object"
import {CREATE_ACCESS, HAS_FORM_CREATE} from "../../../consts"
import {AppContext} from "../../../Contexts/AppContext"

const TableCreateButton = () => {
    const appContext = useContext(AppContext);
    const tableContext = useContext(TableContext);
    const manifest = tableContext.manifest;
    if (!isShowButton(appContext, manifest.moduleName, CREATE_ACCESS)) {
        return null;
    }

    console.log(manifest);

    if (!manifest.routes.includes(HAS_FORM_CREATE)) {
        return null;
    }

    return (
        <Button
            htmlType={"submit"}
            type={"primary"}
            size={'default'}
        >
            <Link to={`/${manifest.displayName}/create`}>
                Create
            </Link>
        </Button>
    )
};

export default TableCreateButton;
