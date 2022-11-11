import {Button} from "antd";
import React, {useContext} from 'react';
import {FormContext} from "../../Contexts/FormContext";
import {AppContext} from "../../App"
import {isShowButton} from "../../Helpers/object"
import {WRITE_ACCESS} from "../../consts"

const EditButton = () => {
    const appContext = useContext(AppContext);
    const formContext = useContext(FormContext);

    if (!isShowButton(appContext, formContext.manifest.moduleName, WRITE_ACCESS)) {
        return null;
    }

    if (formContext.id && formContext.formState.formDisabled) {
        return (<Button
            htmlType={"submit"}
            type={"primary"}
            size={'default'}
            onClick={() => {
                formContext.formActions.toggleEditMode();
            }}
        >
            Edit
        </Button>)
    }
    return null;
};

export default EditButton;
