import {Form, Select} from "antd";
import {useContext, useEffect, useState} from "react";
import CustomInputSkeleton from "../CustomInputSkeleton";
import {formItemFieldProps} from "../../Helpers/form";
import {FormContext} from "../../Contexts/FormContext";

const FormItemSelect = (props) => {
    const formContext = useContext(FormContext);
    const [state, setState] = useState({
        options: []
    });
    const [formItemProps, fieldProps] = formItemFieldProps(props, {
        allowClear: true,
        showSearch: true,
    });

    useEffect(() => {
        if (props.options && props.options.length) {
            setState((prevState) => ({
                ...prevState,
                options: props.options
            }));
        }
    }, []);

    return (
        <Form.Item {...formItemProps}>
            {props.loading ? <CustomInputSkeleton {...props}/> :
                <Select {...fieldProps}>
                    {state.options.map((option) => {
                        return (
                            <Select.Option key={option.value} value={option.value}>
                                {option.label}
                            </Select.Option>
                        )
                    })}
                </Select>
            }
        </Form.Item>
    )
}

export default FormItemSelect;
