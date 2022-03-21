import ColForm from "../Grid/ColForm";
import {MinusCircleOutlined} from "@ant-design/icons";
import React, {useContext} from "react";
import {snakeToCamel} from "../../Helpers/string";
import {FormContext} from "../../Contexts/FormContext";

const RemoveLineButton = (props) => {
    const formContext = useContext(FormContext);

    return (
        <ColForm lg={1}>
            {!formContext.formState.formDisabled &&
            <MinusCircleOutlined onClick={(item) => {
                if (formContext.form.getFieldsValue()[props.dynamicName] && formContext.form.getFieldsValue()[props.dynamicName][props.name]) {
                    if (formContext.form.getFieldsValue()[props.dynamicName][props.name].id) {
                        formContext.setState((prevState) => {
                            let newState = {
                                ...prevState
                            };
                            newState[`${snakeToCamel(props.dynamicName)}OptionReload`] = [];
                            newState[`${snakeToCamel(props.dynamicName)}Deleted`] = [...prevState[`${snakeToCamel(props.dynamicName)}Deleted`], formContext.form.getFieldsValue()[props.dynamicName][props.name].id];
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
