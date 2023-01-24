import React, {useContext} from 'react';
import {FormContext} from "../../Contexts/FormContext";
import {Link} from "react-router-dom";
import {Button} from "antd";
import {AppContext} from "../../App"

const FormCreateButton = () => {
    const appContext = useContext(AppContext);
    const formContext = useContext(FormContext);

    if (formContext.id && formContext.formState.formDisabled) {
        return (<Button
            htmlType={"submit"}
            type={"primary"}
            size={'default'}
        >
            <Link to={`/${formContext.manifest.displayName}/create`}>
                Create
            </Link>
        </Button>)
    }
    return null;
};

export default FormCreateButton;
