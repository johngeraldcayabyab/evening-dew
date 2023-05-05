import {Form, Input} from "antd";
import React, {useContext} from "react";
import {FormContext} from "../../Contexts/FormContext";
import useFieldHook from "../../Hooks/useFieldHook"

const FormItemStatus = (props) => {
    const formContext = useContext(FormContext);
    const [formItemProps, fieldProps] = useFieldHook(props, {
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
