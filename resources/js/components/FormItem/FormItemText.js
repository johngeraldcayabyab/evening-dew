import FormLabel from "../Typography/FormLabel";
import {Form, Input} from "antd";
import React from "react";
import CustomInputSkeleton from "../CustomInputSkeleton";

const FormItemText = (props) => {
    return (
        <Form.Item
            label={props.label ? <FormLabel>{props.label}</FormLabel> : null}
            name={props.name}
            validateStatus={props.errors[props.name] ? 'error' : null}
            help={props.errors[props.name] ? props.errors[props.name] : null}
            rules={[{required: props.required, message: props.message}]}
            colon={false}
            labelCol={props.size === 'large' || props.size === 'medium' ? {span: 24} : {span: 8}}
            wrapperCol={props.size === 'large' || props.size === 'medium' ? {span: 24, style: {flex: '0 0 100%'}} : {span: 16}}
        >
            {props.loading ? <CustomInputSkeleton {...props}/> :
                <Input
                    disabled={props.formDisabled}
                    size={props.size ? props.size : 'small'}
                    placeholder={props.placeholder ? props.placeholder : null}
                />
            }
        </Form.Item>
    )
};

export default FormItemText;
