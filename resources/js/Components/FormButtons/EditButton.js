import {Button} from "antd";
import React, {useContext} from 'react';
import {FormContext} from "../../Contexts/FormContext";
import {HAS_FORM_UPDATE} from "../../consts"

const EditButton = () => {
    const formContext = useContext(FormContext);
    const manifest = formContext.manifest;

    if (!manifest.routes.includes(HAS_FORM_UPDATE)) {
        return null;
    }

    return (
        <Button
            htmlType={"submit"}
            type={"primary"}
            size={'default'}
            onClick={() => {
                formContext.formActions.toggleEditMode();
            }}
        >
            Edit
        </Button>
    );
};

export default EditButton;
