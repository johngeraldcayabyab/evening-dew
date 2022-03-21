import {Button} from "antd";
import React, {useContext} from 'react';
import {FormContext} from "../../Contexts/FormContext";

const EditButton = () => {
    const formContext = useContext(FormContext);

    if (formContext.id && formContext.formState.formDisabled) {
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
        )
    }
    return null;
};

export default EditButton;
