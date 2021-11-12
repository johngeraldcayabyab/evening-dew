import FormLabel from "../Typography/FormLabel";
import {Form, Input} from "antd";
import React from "react";

const FormItemText = (props) => {
    return (
        <Form.Item
            label={<FormLabel>{props.label}</FormLabel>}
            name={props.name}
            validateStatus={props.errors[props.name] ? 'error' : false}
            help={props.errors[props.name] ? props.errors[props.name] : false}
            rules={[{required: props.required, message: props.message}]}
            colon={false}
        >
            <Input disabled={props.formDisabled}/>
        </Form.Item>
    )
};

export default FormItemText;
