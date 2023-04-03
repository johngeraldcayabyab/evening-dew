import {Form, Input} from "antd";
import React, {useContext} from "react";
import CustomInputSkeleton from "../CustomInputSkeleton";
import {formItemFieldProps} from "../../Helpers/form";
import {FormContext} from "../../Contexts/FormContext";

const FormItemText = (props) => {
    const formContext = useContext(FormContext);
    const [formItemProps, fieldProps] = formItemFieldProps(props);

    return (
        <Form.Item {...formItemProps}>
            {formContext.formState.loading ? <CustomInputSkeleton {...props}/> :
                <Input {...fieldProps}/>
            }
        </Form.Item>
    )
};

export default FormItemText;
