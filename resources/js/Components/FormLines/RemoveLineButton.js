import ColForm from "../Grid/ColForm";
import {MinusCircleOutlined} from "@ant-design/icons";
import React, {useContext} from "react";
import {snakeToCamel} from "../../Helpers/string";
import {FormContext} from "../../Contexts/FormContext";

/**
 *
 * This thing can only understand the resetting key
 *
 */
const RemoveLineButton = (props) => {
    const formContext = useContext(FormContext);
    const form = formContext.form;
    const formState = formContext.formState;

    function checkIfRemovedLineIsInDatabase(actualFieldsValue) {
        if (actualFieldsValue[props.listName] && actualFieldsValue[props.listName][props.name]) {
            if (actualFieldsValue[props.listName][props.name].id) {
                console.log('yes its from db');
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
                    const field = `${snakeToCamel(props.listName)}Deleted`;
                    const deletedLines = [
                        ...formContext.state[field],
                        actualFieldsValue[props.listName][props.name].id
                    ];
                    formContext.setState(prevState => ({
                        ...prevState,
                        [field]: deletedLines,
                    }));
                }
                props.remove(props.name);
            }}/>}
        </ColForm>
    )
}

export default RemoveLineButton;
