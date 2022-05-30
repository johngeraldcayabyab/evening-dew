import {Button} from "antd";
import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {FormContext} from "../../Contexts/FormContext";

const DiscardCreateButton = () => {
    const formContext = useContext(FormContext);

    if (!formContext.id && !formContext.formState.formDisabled) {
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
        )
    }
    return null;
};

export default DiscardCreateButton;
