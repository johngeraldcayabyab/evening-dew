import {Button} from "antd";
import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {FormContext} from "../../Contexts/FormContext";
import {AppContext} from "../../App"
import {isShowButton} from "../../Helpers/object"
import {CREATE_ACCESS} from "../../consts"

const DiscardCreateButton = () => {
    const appContext = useContext(AppContext);
    const formContext = useContext(FormContext);

    if (!isShowButton(appContext, formContext.manifest.moduleName, CREATE_ACCESS)) {
        return null;
    }

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
