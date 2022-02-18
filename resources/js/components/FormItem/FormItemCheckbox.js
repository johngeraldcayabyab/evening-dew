import {Checkbox, Input} from "antd";
import {Form, Select} from "antd";
import FormLabel from "../Typography/FormLabel";
import React from "react";
import CustomInputSkeleton from "../CustomInputSkeleton";

const FormItemCheckbox = (props) => {

    const formItemProps = {
        label: props.label ? <FormLabel>{props.label}</FormLabel> : null,
        name: props.name,
        rules: [{required: props.required, message: props.message}],
        colon: false,
        labelCol: props.size === 'large' || props.size === 'medium' ? {span: 24} : {span: 8},
        wrapperCol: props.size === 'large' || props.size === 'medium' ? {
            span: 24,
            style: {flex: '0 0 100%'}
        } : {span: 16},
    };

    if (props.errors[props.name]) {
        formItemProps.validateStatus = 'error';
        formItemProps.help = props.errors[props.name];
    } else if (props.errors[`${props.listName}.${props.groupName}.${props.name}`]) {
        formItemProps.validateStatus = 'error';
        formItemProps.help = props.errors[`${props.listName}.${props.groupName}.${props.name}`];
    }

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
    }

    return (
        <Form.Item {...formItemProps} valuePropName="checked">
            {props.loading ? <CustomInputSkeleton {...props}/> :
                <Checkbox {...fieldProps}/>
            }
        </Form.Item>
    )
};

export default FormItemCheckbox
