import {formItemFieldProps} from "../../Helpers/form";
import {Form, Input} from "antd";
import React from "react";

const FormItemStatus = (props) => {
    const [formItemProps, fieldProps] = formItemFieldProps(props, {
        disabled: true,
        style: {display: 'none', position: 'absolute'} // turn this off for debugging purposes
    });
    return (
        <Form.Item {...formItemProps} style={{display: 'none', position: 'absolute'}}>
            <Input {...fieldProps}/>
        </Form.Item>
    )
};

export default FormItemStatus;
