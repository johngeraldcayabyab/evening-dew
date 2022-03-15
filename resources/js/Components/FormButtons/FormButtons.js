import React from 'react';
import EditButton from "./EditButton";
import SaveEditButton from "./SaveEditButton";
import DiscardEditButton from "./DiscardEditButton";
import FormCreateButton from "./FormCreateButton";
import SaveCreateButton from "./SaveCreateButton";
import DiscardCreateButton from "./DiscardCreateButton";
import {Space} from "antd";

const FormButtons = (props) => {

    let passedProps = {
        id: props.id,
        form: props.form,
        formState: props.formState,
        formActions: props.formActions,
        manifest: props.manifest
    };

    return (
        <Space size={'small'}>
            <EditButton {...passedProps}/>
            <SaveEditButton {...passedProps}/>
            <DiscardEditButton {...passedProps}/>

            <FormCreateButton {...passedProps}/>
            <SaveCreateButton {...passedProps}/>
            <DiscardCreateButton {...passedProps}/>
        </Space>
    )
};

export default FormButtons;
