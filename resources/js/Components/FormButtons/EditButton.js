import {Button} from "antd";
import React, {useContext} from 'react';
import {FormContext} from "../../Contexts/FormContext";

const EditButton = () => {
    const formContext = useContext(FormContext);

    function isViewing() {
        return !!(formContext.id && formContext.formState.formDisabled);
    }

    if (!isViewing()) {
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
