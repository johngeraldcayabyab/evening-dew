import {Button} from "antd";
import React from 'react';

const EditButton = (props) => {
    if (props.id && props.formState.formDisabled) {
        return (
            <Button
                htmlType={"submit"}
                type={"primary"}
                // className={"custom-button"}
                size={'default'}
                onClick={() => {
                    props.formActions.toggleEditMode();
                }}
            >
                Edit
            </Button>
        )
    }
    return null;
};

export default EditButton;
