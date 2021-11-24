import FormLabel from "../Typography/FormLabel";
import {Form, Select} from "antd";
import {useEffect, useState} from "react";
import {uuidv4} from "../../Helpers/string";
import {fetchGet} from "../../Helpers/fetcher";

const FormItemSelectAjax = (props) => {

    const [state, setState] = useState({
        options: [],
        filterOption: []
    });

    useEffect(() => {
        if (props.url) {
            fetchGet(`${props.url}`)
                .then(response => response.json())
                .then((data) => {
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
        fetchGet(`${props.url}?search=${search}`)
            .then(response => response.json())
            .then((data) => {
                setState((prevState) => ({
                    ...prevState,
                    options: data.map((option) => ({
                        value: option.id,
                        label: option.slug
                    }))
                }));
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
                filterOption={state.filterOption}
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
