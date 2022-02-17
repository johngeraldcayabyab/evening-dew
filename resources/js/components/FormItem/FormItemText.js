import FormLabel from "../Typography/FormLabel";
import {Form, Input} from "antd";
import React from "react";
import CustomInputSkeleton from "../CustomInputSkeleton";

const FormItemText = (props) => {

    const formItemProps = {
        label: props.label ? <FormLabel>{props.label}</FormLabel> : null,
        name: props.name,
        validateStatus: props.errors[props.name] ? 'error' : null,
        help: props.errors[props.name] ? props.errors[props.name] : null,
        rules: [{required: props.required, message: props.message}],
        colon: false,
        labelCol: props.size === 'large' || props.size === 'medium' ? {span: 24} : {span: 8},
        wrapperCol: props.size === 'large' || props.size === 'medium' ? {span: 24, style: {flex: '0 0 100%'}} : {span: 16},
    };

    const fieldProps = {
        disabled: props.formDisabled,
        size: props.size ? props.size : 'small',
        placeholder: props.placeholder ? props.placeholder : null,
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
                <Input {...fieldProps}/>
            }
        </Form.Item>
    )
};

export default FormItemText;
