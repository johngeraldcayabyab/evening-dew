import React from 'react';
import EditButton from "./EditButton";
import manifest from "../../MeasureCategory/__manifest__.json";
import SaveEditButton from "./SaveEditButton";
import DiscardEditButton from "./DiscardEditButton";
import CreateButton from "./CreateButton";
import SaveCreateButton from "./SaveCreateButton";
import DiscardCreateButton from "./DiscardCreateButton";

const ActionButtons = (props) => {
    return (
        <React.Fragment>
            <EditButton id={props.id} form={props.form} formState={props.formState} formActions={props.formActions} manifest={props.manifest}/>
            <SaveEditButton id={props.id} form={props.form} formState={props.formState} formActions={props.formActions} manifest={props.manifest}/>
            <DiscardEditButton id={props.id} form={props.form} formState={props.formState} formActions={props.formActions} manifest={props.manifest}/>
            <CreateButton id={props.id} form={props.form} formState={props.formState} formActions={props.formActions} manifest={props.manifest}/>
            <SaveCreateButton id={props.id} form={props.form} formState={props.formState} formActions={props.formActions} manifest={props.manifest}/>
            <DiscardCreateButton id={props.id} form={props.form} formState={props.formState} formActions={props.formActions} manifest={props.manifest}/>
        </React.Fragment>
    )
};

export default ActionButtons;
