import {Checkbox, Form} from "antd";
import React, {useContext} from "react";
import CustomInputSkeleton from "../CustomInputSkeleton";
import {FormContext} from "../../Contexts/FormContext";
import useFieldHook from "../../Hooks/useFieldHook"

const FormItemCheckbox = (props) => {
    const formContext = useContext(FormContext);
    const [formItemProps, fieldProps] = useFieldHook(props);

    return (
        <Form.Item {...formItemProps} valuePropName="checked">
            {formContext.formState.loading ? <CustomInputSkeleton {...props}/> :
                <Checkbox {...fieldProps}/>
            }
        </Form.Item>
    )
};

export default FormItemCheckbox
