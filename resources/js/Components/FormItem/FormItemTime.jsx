import {Form, TimePicker} from "antd";
import React, {useContext} from "react";
import CustomInputSkeleton from "../CustomInputSkeleton";
import {FormContext} from "../../Contexts/FormContext";
import useFieldHook from "../../Hooks/useFieldHook"

const FormItemTime = (props) => {
    const formContext = useContext(FormContext);
    const [formItemProps, fieldProps] = useFieldHook(props, {
        style: {width: "100%"},
    });

    return (
        <Form.Item {...formItemProps}>
            {formContext.formState.loading ? <CustomInputSkeleton {...props}/> :
                <TimePicker use12Hours format="h:mm a" {...fieldProps} />
            }
        </Form.Item>
    )
};

export default FormItemTime;
