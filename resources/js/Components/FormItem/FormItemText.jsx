import {Form, Input} from "antd";
import React, {useContext} from "react";
import CustomInputSkeleton from "../CustomInputSkeleton";
import {FormContext} from "../../Contexts/FormContext";
import useFieldHook from "../../Hooks/useFieldHook";

const FormItemText = (props) => {
    const formContext = useContext(FormContext);
    const [formItemProps, fieldProps] = useFieldHook(props);

    return (
        <Form.Item {...formItemProps}>
            {formContext.formState.loading ? <CustomInputSkeleton {...props}/> :
                <Input {...fieldProps}/>
            }
        </Form.Item>
    )
};

export default FormItemText;
