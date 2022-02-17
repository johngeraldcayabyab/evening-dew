import FormLabel from "../Typography/FormLabel";
import {Form, InputNumber} from "antd";
import React from "react";
import CustomInputSkeleton from "../CustomInputSkeleton";

const FormItemNumber = (props) => {

    const formItemProps = {
        label: props.label ? <FormLabel>{props.label}</FormLabel> : null,
        name: props.name,
        validateStatus: props.errors[props.name] ? 'error' : false,
        help: props.errors.ratio ? props.errors[props.name] : false,
        rules: [{required: props.required, message: props.message}],
        colon: false,
        labelCol: props.size === 'large' || props.size === 'medium' ? {span: 24} : null,
        wrapperCol: props.size === 'large' || props.size === 'medium' ? {span: 24} : null,
    };

    const fieldProps = {
        disabled: props.formDisabled,
        style: {width: "100%"},
        step: props.step,
        size: props.size ? props.size : 'small',
        placeholder: props.placeholder ? props.placeholder : null,
        // min=""
        // max="10"
    };

    if (props.isListField) {
        formItemProps.isListField = true;
        formItemProps.fieldKey = props.fieldKey;
        delete formItemProps.labelCol;
        formItemProps.wrapperCol = {span: 24};
        formItemProps.style = props.style;
        formItemProps.name = [props.groupName, props.name];
        // validateStatus: props.errors[props.name] ? 'error' : false,
        // help: props.errors.ratio ? props.errors[props.name] : false,
    }

    return (
        <Form.Item {...formItemProps}>
            {props.loading ? <CustomInputSkeleton {...props}/> :
                <InputNumber {...fieldProps}/>
            }
        </Form.Item>
    )
};

export default FormItemNumber;
