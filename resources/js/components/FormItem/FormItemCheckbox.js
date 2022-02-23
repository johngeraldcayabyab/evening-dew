import {Checkbox, Form} from "antd";
import React from "react";
import CustomInputSkeleton from "../CustomInputSkeleton";
import {formItemFieldProps} from "../../Helpers/formItem";

const FormItemCheckbox = (props) => {
    const [formItemProps, fieldProps] = formItemFieldProps(props);

    return (
        <Form.Item {...formItemProps} valuePropName="checked">
            {props.loading ? <CustomInputSkeleton {...props}/> :
                <Checkbox {...fieldProps}/>
            }
        </Form.Item>
    )
};

export default FormItemCheckbox
