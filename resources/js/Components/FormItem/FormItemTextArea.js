import {Form, Input} from "antd";
import React, {useContext} from "react";
import CustomInputSkeleton from "../CustomInputSkeleton";
import {formItemFieldProps} from "../../Helpers/form";
import {FormContext} from "../../Contexts/FormContext";

const {TextArea} = Input;

const FormItemTextArea = (props) => {
    const formContext = useContext(FormContext);
    const [formItemProps, fieldProps] = formItemFieldProps(props);

    return (
        <Form.Item {...formItemProps}>
            {formContext.formState.loading ? <CustomInputSkeleton {...props}/> :
                <TextArea {...fieldProps} rows={4}/>
            }
        </Form.Item>
    )
};

export default FormItemTextArea;
