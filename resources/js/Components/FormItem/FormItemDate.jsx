import {DatePicker, Form} from "antd";
import React, {useContext} from "react";
import CustomInputSkeleton from "../CustomInputSkeleton";
import {FormContext} from "../../Contexts/FormContext";
import useFieldHook from "../../Hooks/useFieldHook"

const FormItemDate = (props) => {
    const formContext = useContext(FormContext);
    const [formItemProps, fieldProps] = useFieldHook(props, {
        style: {width: "100%"},
        showTime: props.showTime ? props.showTime : false,
    });

    return (
        <Form.Item {...formItemProps}>
            {formContext.formState.loading ? <CustomInputSkeleton {...props}/> :
                <DatePicker {...fieldProps}/>
            }
        </Form.Item>
    )
};

export default FormItemDate;
