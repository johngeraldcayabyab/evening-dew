import React, {useContext} from 'react';
import {FormContext} from "../../Contexts/FormContext";
import {Link} from "react-router-dom";
import {Button} from "antd";
import {HAS_FORM_CREATE} from "../../consts"

const CreateButton = () => {
    const formContext = useContext(FormContext);
    const manifest = formContext.manifest;

    if (!manifest.routes.includes(HAS_FORM_CREATE)) {
        return null;
    }

    return (
        <Button
            htmlType={"submit"}
            type={"primary"}
            size={'default'}
        >
            <Link to={`/${formContext.manifest.displayName}/create`}>
                Create
            </Link>
        </Button>
    );
};

export default CreateButton;
