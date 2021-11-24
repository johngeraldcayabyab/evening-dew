import FormLabel from "../Typography/FormLabel";
import {Form, InputNumber} from "antd";
import React from "react";

const FormItemNumber = (props) => {
    return (
        <Form.Item
            label={<FormLabel>{props.label}</FormLabel>}
            name={props.name}
            validateStatus={props.errors[props.name] ? 'error' : false}
            help={props.errors.ratio ? props.errors[props.name] : false}
            rules={[{required: props.required, message: props.message}]}
            colon={false}
        >
            <InputNumber
                disabled={props.formDisabled}
                style={{width: "100%"}}
                // defaultValue="1"
                // min=""
                // max="10"
                step="0.010"
            />
        </Form.Item>
    )
};

export default FormItemNumber;
