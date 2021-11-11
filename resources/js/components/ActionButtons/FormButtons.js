import React from 'react';
import EditButton from "./EditButton";
import SaveEditButton from "./SaveEditButton";
import DiscardEditButton from "./DiscardEditButton";
import FormCreateButton from "./FormCreateButton";
import SaveCreateButton from "./SaveCreateButton";
import DiscardCreateButton from "./DiscardCreateButton";
import {Space} from "antd";

const FormButtons = (props) => {
    return (
        <Space size={'small'}>
            <EditButton id={props.id} form={props.form} formState={props.formState} formActions={props.formActions} manifest={props.manifest}/>
            <SaveEditButton id={props.id} form={props.form} formState={props.formState} formActions={props.formActions} manifest={props.manifest}/>
            <DiscardEditButton id={props.id} form={props.form} formState={props.formState} formActions={props.formActions} manifest={props.manifest}/>

            <FormCreateButton id={props.id} form={props.form} formState={props.formState} formActions={props.formActions} manifest={props.manifest}/>
            <SaveCreateButton id={props.id} form={props.form} formState={props.formState} formActions={props.formActions} manifest={props.manifest}/>
            <DiscardCreateButton id={props.id} form={props.form} formState={props.formState} formActions={props.formActions} manifest={props.manifest}/>
        </Space>
    )
};

export default FormButtons;
