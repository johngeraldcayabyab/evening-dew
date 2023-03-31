import ColForm from "../Grid/ColForm";
import {MinusCircleOutlined} from "@ant-design/icons";
import React, {useContext} from "react";
import {FormContext} from "../../Contexts/FormContext";

const RemoveLineButton = (props) => {
    const formContext = useContext(FormContext);
    const form = formContext.form;
    const formState = formContext.formState;

    function checkIfRemovedLineIsInDatabase(actualFieldsValue) {
        if (actualFieldsValue[props.listName] && actualFieldsValue[props.listName][props.name]) {
            if (actualFieldsValue[props.listName][props.name].id) {
                return true;
            }
        }
        return false;
    }

    return (
        <ColForm lg={1}>
            {!formState.formDisabled &&
                <MinusCircleOutlined onClick={() => {
                    const actualFieldsValue = form.getFieldsValue();
                    if (checkIfRemovedLineIsInDatabase(actualFieldsValue)) {
                        const deletedList = `${props.listName}_deleted`;
                        const deletedId = actualFieldsValue[props.listName][props.name].id;
                        if (actualFieldsValue[deletedList]) {
                            actualFieldsValue[deletedList].push({id: deletedId});
                        } else {
                            actualFieldsValue[deletedList] = [{id: deletedId}];
                        }
                        form.setFieldsValue(actualFieldsValue);
                    }
                    props.remove(props.name);
                }}/>}
        </ColForm>
    )
}

export default RemoveLineButton;
