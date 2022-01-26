import FormLabel from "../Typography/FormLabel";
import {Form, Input, Skeleton} from "antd";
import React from "react";
import CustomInputSkeleton from "../CustomInputSkeleton";

const FormItemText = (props) => {
    return (
        <Form.Item
            label={<FormLabel>{props.label}</FormLabel>}
            name={props.name}
            validateStatus={props.errors[props.name] ? 'error' : null}
            help={props.errors[props.name] ? props.errors[props.name] : null}
            rules={[{required: props.required, message: props.message}]}
            colon={false}
            labelCol={props.size === 'large' || props.size === 'medium' ? {span: 24} : null}
            wrapperCol={props.size === 'large' || props.size === 'medium' ? {span: 24} : null}
        >
            {props.loading ? <CustomInputSkeleton {...props}/> :
                <Input
                    disabled={props.formDisabled}
                    size={props.size ? props.size : 'small'}
                />
            }
        </Form.Item>
    )
};

export default FormItemText;
