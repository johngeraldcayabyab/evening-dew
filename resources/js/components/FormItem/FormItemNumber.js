import FormLabel from "../Typography/FormLabel";
import {Form, InputNumber} from "antd";
import React from "react";
import CustomInputSkeleton from "../CustomInputSkeleton";

const FormItemNumber = (props) => {
    return (
        <Form.Item
            label={<FormLabel>{props.label}</FormLabel>}
            name={props.name}
            validateStatus={props.errors[props.name] ? 'error' : false}
            help={props.errors.ratio ? props.errors[props.name] : false}
            rules={[{required: props.required, message: props.message}]}
            colon={false}
            labelCol={props.size === 'large' || props.size === 'medium' ? {span: 24} : null}
            wrapperCol={props.size === 'large' || props.size === 'medium' ? {span: 24} : null}
        >
            {props.loading ? <CustomInputSkeleton/> :
                <InputNumber
                    disabled={props.formDisabled}
                    style={{width: "100%"}}
                    step={props.step}
                    size={props.size ? props.size : 'small'}
                    // min=""
                    // max="10"
                />
            }
        </Form.Item>
    )
};

export default FormItemNumber;
