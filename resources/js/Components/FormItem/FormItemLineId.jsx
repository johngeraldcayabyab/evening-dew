import {Form, InputNumber} from "antd";
import React, {useContext} from "react";
import CustomInputSkeleton from "../CustomInputSkeleton";
import {FormContext} from "../../Contexts/FormContext";

const FormItemLineId = (props) => {
    const formContext = useContext(FormContext);
    const formItemProps = {
        isListField: true,
        fieldKey: props.fieldKey,
        style: {display: 'none', position: 'absolute', marginTop: '-9999999999px'},
        name: [props.groupName, props.name],
    };

    const fieldProps = {
        disabled: true,
    };

    if (props.isListField) {
        if (formContext.formState.errors[`${props.listName}.${props.fieldKey}.${props.name}`]) {
            formItemProps.validateStatus = 'error';
            formItemProps.help = formContext.formState.errors[`${props.listName}.${props.fieldKey}.${props.name}`];
        }
    }

    return (
        <Form.Item {...formItemProps}>
            {formContext.formState.loading ? <CustomInputSkeleton {...props}/> :
                <InputNumber {...fieldProps}/>
            }
        </Form.Item>
    )
};

export default FormItemLineId;
