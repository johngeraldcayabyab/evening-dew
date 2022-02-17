import FormLabel from "../Typography/FormLabel";
import {Form, Select} from "antd";
import {useEffect, useState} from "react";
import {uuidv4} from "../../Helpers/string";
import CustomInputSkeleton from "../CustomInputSkeleton";

const FormItemSelect = (props) => {
    const [state, setState] = useState({
        options: []
    });

    const formItemProps = {
        label: props.label ? <FormLabel>{props.label}</FormLabel> : null,
        name: props.name,
        validateStatus: props.errors[props.name] ? 'error' : null,
        help: props.errors.name ? props.errors[props.name] : null,
        rules: [{required: props.required, message: props.message}],
        colon: false,
        labelCol: props.size === 'large' || props.size === 'medium' ? {span: 24} : null,
        wrapperCol: props.size === 'large' || props.size === 'medium' ? {span: 24} : null,
    };

    const fieldProps = {
        allowClear: true,
        disabled: props.formDisabled,
        showSearch: true,
        size: props.size ? props.size : 'small',
        placeholder: props.placeholder ? props.placeholder : null,
    };

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
                            <Select.Option key={uuidv4()} value={option.value}>
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
