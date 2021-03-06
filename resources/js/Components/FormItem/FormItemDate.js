import {DatePicker, Form} from "antd";
import React, {useContext} from "react";
import CustomInputSkeleton from "../CustomInputSkeleton";
import {formItemFieldProps} from "../../Helpers/form";
import {FormContext} from "../../Contexts/FormContext";

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

const FormItemDate = (props) => {
    const formContext = useContext(FormContext);

    // console.log(props);
    // if (objectHasValue(props.initialValues)) {
    //     // props.initialValues.
    //     // getOptions(getQueryFromInitialValue());
    // }

    const [formItemProps, fieldProps] = formItemFieldProps(props, {
        style: {width: "100%"},
        showTime: true,
        // format: {dateFormat},
        // defaultValue={moment('2015/01/01', dateFormat)}
        // defaultValue: moment('2022-03-31 09:04:06', dateFormat),
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
