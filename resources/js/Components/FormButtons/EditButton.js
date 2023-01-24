import {Button} from "antd";
import React, {useContext} from 'react';
import {FormContext} from "../../Contexts/FormContext";
import {AppContext} from "../../App"

const EditButton = () => {
    const appContext = useContext(AppContext);
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
