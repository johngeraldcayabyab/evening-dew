import ColForm from "../Grid/ColForm";
import {MinusCircleOutlined} from "@ant-design/icons";
import React, {useContext} from "react";
import {snakeToCamel} from "../../Helpers/string";
import {FormContext} from "../../Contexts/FormContext";

const RemoveLineButton = (props) => {
    const formContext = useContext(FormContext);
    const form = formContext.form;

    return (
        <ColForm lg={1}>
            {!formContext.formState.formDisabled &&
            <MinusCircleOutlined onClick={() => {
                if (form.getFieldsValue()[props.listName] && form.getFieldsValue()[props.listName][props.name]) {
                    if (form.getFieldsValue()[props.listName][props.name].id) {
                        formContext.setState((prevState) => {
                            let newState = {
                                ...prevState
                            };
                            // newState[`${snakeToCamel(props.listName)}OptionReload`] = [];
                            newState[`${snakeToCamel(props.listName)}Deleted`] = [...prevState[`${snakeToCamel(props.listName)}Deleted`], form.getFieldsValue()[props.listName][props.name].id];
                            return newState
                        });
                    }
                }
                props.remove(props.name);
            }}/>}
        </ColForm>
    )
}

export default RemoveLineButton;
