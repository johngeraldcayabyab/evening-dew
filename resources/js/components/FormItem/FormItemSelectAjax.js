import FormLabel from "../Typography/FormLabel";
import {Form, Select} from "antd";
import {useEffect, useState} from "react";
import {uuidv4} from "../../Helpers/string";

const FormItemSelectAjax = (props) => {

    const [state, setState] = useState({
        options: [],
        filterOption: []
    });

    useEffect(() => {
        if (props.url) {
            fetch(`${props.url}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(response => response.json()).then((data) => {
                setState((prevState) => ({
                    ...prevState,
                    options: data.map((option) => ({
                        value: option.id,
                        label: option.slug
                    }))
                }));
            });
        }
    }, []);

    function onSearch(search) {
        fetch(`${props.url}?search=${search}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => response.json()).then((data) => {
            // setState((prevState) => ({
            //     ...prevState,
            //     options: data.map((option) => ({
            //         value: option.id,
            //         label: option.slug
            //     }))
            // }));
        });
    }

    return (
        <Form.Item
            label={<FormLabel>{props.label}</FormLabel>}
            name={props.name}
            validateStatus={props.errors[props.name] ? 'error' : false}
            help={props.errors.ratio ? props.errors[props.name] : false}
            rules={[{required: props.required, message: props.message}]}
            colon={false}
        >
            <Select
                allowClear
                disabled={props.formDisabled}
                showSearch
                onSearch={onSearch}
                optionFilterProp="children"
                filterOption={state.options}
            >
                {state.options.map((option) => {
                    return (
                        <Select.Option key={uuidv4()} value={option.value}>
                            {option.label}
                        </Select.Option>
                    )
                })}
            </Select>
        </Form.Item>
    )
}

export default FormItemSelectAjax;
