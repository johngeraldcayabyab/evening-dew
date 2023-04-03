import {Button} from "antd";
import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {FormContext} from "../../Contexts/FormContext";
import {HAS_FORM_CREATE} from "../../consts"

const DiscardCreateButton = () => {
    const formContext = useContext(FormContext);
    const manifest = formContext.manifest;

    if (!manifest.routes.includes(HAS_FORM_CREATE)) {
        return null;
    }

    return (
        <Button
            htmlType={"button"}
            type={"primary"}
            size={'default'}
        >
            <Link to={`/${formContext.manifest.displayName}`}>
                Discard
            </Link>
        </Button>
    );
};

export default DiscardCreateButton;
