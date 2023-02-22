import {Button} from "antd";
import React, {useContext} from 'react';
import {FormContext} from "../../Contexts/FormContext";

const EditButton = () => {
    const formContext = useContext(FormContext);

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
