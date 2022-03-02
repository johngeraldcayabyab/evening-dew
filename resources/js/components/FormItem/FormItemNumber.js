import {Form, InputNumber} from "antd";
import React from "react";
import CustomInputSkeleton from "../CustomInputSkeleton";
import {formItemFieldProps} from "../../Helpers/form";

const FormItemNumber = (props) => {
    const [formItemProps, fieldProps] = formItemFieldProps(props, {
        style: {width: "100%"},
        step: props.step,
        min: props.min,
        max: props.max,
    });

    return (
        <Form.Item {...formItemProps}>
            {props.loading ? <CustomInputSkeleton {...props}/> :
                <InputNumber {...fieldProps}/>
            }
        </Form.Item>
    )
};

export default FormItemNumber;
