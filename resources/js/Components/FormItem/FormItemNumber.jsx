import {Form, InputNumber} from "antd";
import React, {useContext} from "react";
import CustomInputSkeleton from "../CustomInputSkeleton";
import {formItemFieldProps} from "../../Helpers/form";
import {FormContext} from "../../Contexts/FormContext";

const FormItemNumber = (props) => {
    const formContext = useContext(FormContext);
    const [formItemProps, fieldProps] = formItemFieldProps(props, {
        style: {width: "100%"},
        step: props.step,
        min: props.min,
        max: props.max,
    });

    return (
        <Form.Item {...formItemProps}>
            {formContext.formState.loading ? <CustomInputSkeleton {...props}/> :
                <InputNumber {...fieldProps}/>
            }
        </Form.Item>
    )
};

export default FormItemNumber;
