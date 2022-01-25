import FormLabel from "../Typography/FormLabel";
import {Form, Select} from "antd";
import {useEffect, useState} from "react";
import {uuidv4} from "../../Helpers/string";
import CustomInputSkeleton from "../CustomInputSkeleton";
import useFetchCatcher from "../../Hooks/useFetchCatcher";
import useFetchHook from "../../Hooks/useFetchHook";
import {GET} from "../../consts";

const FormItemSelectAjax = (props) => {
    const [useFetch, fetchAbort] = useFetchHook();
    const fetchCatcher = useFetchCatcher();
    const [state, setState] = useState({
        options: [],
        filterOption: []
    });

    useEffect(() => {
        if (props.url) {
            useFetch(`${props.url}`, GET).then((response) => {
                setState((prevState) => ({
                    ...prevState,
                    options: response.map((option) => ({
                        value: option.id,
                        label: option.slug
                    }))
                }));
            }).catch((responseErr) => {
                fetchCatcher.get(responseErr);
            });
        }
        return () => {
            fetchAbort();
        };
    }, []);

    function onSearch(search) {
        useFetch(`${props.url}`, GET, {search: search}).then((response) => {
            setState((prevState) => ({
                ...prevState,
                options: response.map((option) => ({
                    value: option.id,
                    label: option.slug
                }))
            }));
        }).catch((responseErr) => {
            fetchCatcher.get(responseErr);
        });
    }

    function onClear() {
        if (props.url) {
            useFetch(`${props.url}`, GET).then((response) => {
                setState((prevState) => ({
                    ...prevState,
                    options: response.map((option) => ({
                        value: option.id,
                        label: option.slug
                    }))
                }));
            }).catch((responseErr) => {
                fetchCatcher.get(responseErr);
            });
        }
    }

    return (
        <Form.Item
            label={<FormLabel>{props.label}</FormLabel>}
            name={props.name}
            validateStatus={props.errors[props.name] ? 'error' : false}
            help={props.errors.ratio ? props.errors[props.name] : false}
            rules={[{required: props.required, message: props.message}]}
            colon={false}
            labelCol={props.size === 'large' || props.size === 'medium' ? {span: 24} : null}
            wrapperCol={props.size === 'large' || props.size === 'medium' ? {span: 24} : null}
        >
            {props.loading ? <CustomInputSkeleton/> :
                <Select
                    allowClear
                    disabled={props.formDisabled}
                    showSearch
                    onSearch={onSearch}
                    optionFilterProp="children"
                    filterOption={state.filterOption}
                    onClear={onClear}
                    size={props.size ? props.size : 'small'}
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

export default FormItemSelectAjax;
