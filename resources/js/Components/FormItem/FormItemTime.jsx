import {TimePicker, Form} from "antd";
import React, {useContext} from "react";
import CustomInputSkeleton from "../CustomInputSkeleton";
import {formItemFieldProps} from "../../Helpers/form";
import {FormContext} from "../../Contexts/FormContext";

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

const FormItemTime = (props) => {
    const formContext = useContext(FormContext);

    // if (objectHasValue(props.initialValues)) {
    //     // props.initialValues.
    //     // getOptions(getQueryFromInitialValue());
    // }

    const [formItemProps, fieldProps] = formItemFieldProps(props, {
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
