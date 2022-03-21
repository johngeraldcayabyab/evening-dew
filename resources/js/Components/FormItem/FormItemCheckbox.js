import {Checkbox, Form} from "antd";
import React, {useContext} from "react";
import CustomInputSkeleton from "../CustomInputSkeleton";
import {formItemFieldProps} from "../../Helpers/form";
import {FormContext} from "../../Contexts/FormContext";

const FormItemCheckbox = (props) => {
    const formContext = useContext(FormContext);
    const [formItemProps, fieldProps] = formItemFieldProps(props);

    return (
        <Form.Item {...formItemProps} valuePropName="checked">
            {formContext.formState.loading ? <CustomInputSkeleton {...props}/> :
                <Checkbox {...fieldProps}/>
            }
        </Form.Item>
    )
};

export default FormItemCheckbox
