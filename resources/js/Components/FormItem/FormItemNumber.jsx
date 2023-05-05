import {Form, InputNumber} from "antd";
import React, {useContext} from "react";
import CustomInputSkeleton from "../CustomInputSkeleton";
import {FormContext} from "../../Contexts/FormContext";
import useFieldHook from "../../Hooks/useFieldHook"

const FormItemNumber = (props) => {
    const formContext = useContext(FormContext);
    const [formItemProps, fieldProps] = useFieldHook(props, {
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
