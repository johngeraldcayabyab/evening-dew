import {Form, Input} from "antd";
import React, {useContext} from "react";
import CustomInputSkeleton from "../CustomInputSkeleton";
import {FormContext} from "../../Contexts/FormContext";
import useFieldHook from "../../Hooks/useFieldHook";

const {TextArea} = Input;

const FormItemTextArea = (props) => {
    const formContext = useContext(FormContext);
    const specialFieldProps = {};
    if (props.hasOwnProperty('autoSize')) {
        specialFieldProps['autoSize'] = props.autoSize;
    }
    const [formItemProps, fieldProps] = useFieldHook(props, specialFieldProps);

    return (
        <Form.Item {...formItemProps}>
            {formContext.formState.loading ? <CustomInputSkeleton {...props}/> :
                <TextArea {...fieldProps}/>
            }
        </Form.Item>
    )
};

export default FormItemTextArea;
