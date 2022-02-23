import {Form, Input} from "antd";
import React from "react";
import CustomInputSkeleton from "../CustomInputSkeleton";
import {formItemFieldProps} from "../../Helpers/formItem";

const FormItemText = (props) => {
    const [formItemProps, fieldProps] = formItemFieldProps(props);

    return (
        <Form.Item {...formItemProps}>
            {props.loading ? <CustomInputSkeleton {...props}/> :
                <Input {...fieldProps}/>
            }
        </Form.Item>
    )
};

export default FormItemText;
