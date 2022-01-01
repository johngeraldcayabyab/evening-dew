import FormLabel from "../Typography/FormLabel";
import {Form, Select} from "antd";
import {useEffect, useState} from "react";
import {uuidv4} from "../../Helpers/string";
import CustomInputSkeleton from "../CustomInputSkeleton";

const FormItemSelect = (props) => {

    const [state, setState] = useState({
        options: []
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
        <Form.Item
            label={<FormLabel>{props.label}</FormLabel>}
            name={props.name}
            validateStatus={props.errors[props.name] ? 'error' : false}
            help={props.errors.ratio ? props.errors[props.name] : false}
            rules={[{required: props.required, message: props.message}]}
            colon={false}
        >
            {props.loading ? <CustomInputSkeleton/> :
                <Select
                    allowClear
                    disabled={props.formDisabled}
                    showSearch
                >
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
