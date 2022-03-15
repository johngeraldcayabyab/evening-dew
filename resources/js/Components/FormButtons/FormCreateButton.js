import React from 'react';
import TableCreateButton from "../TableButtons/TableCreateButton";

const FormCreateButton = (props) => {
    if (props.id && props.formState.formDisabled) {
        return (<TableCreateButton {...props} />)
    }
    return null;
};

export default FormCreateButton;
