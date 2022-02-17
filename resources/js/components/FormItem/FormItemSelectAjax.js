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
        if (props.url && !props.initialLoad) {
            let search = null;
            if (props.id && props.query) {
                search = props.initialValues;
                props.query.split('.').forEach((query) => {
                    search = search[query];
                });
            } else if (!props.id && props.initialValues[props.name]) {
                search = props.initialValues;
                props.query.split('.').forEach((query) => {
                    search = search[query];
                });
            }
            getOptions(search);
        }
    }, [props.initialLoad]);

    useEffect(() => {
        return () => {
            fetchAbort();
        };
    }, []);

    useEffect(() => {
        if (props.search) {
            getOptions(props.search);
        }
    }, [props.search]);

    function onSearch(search) {
        getOptions(search);
    }

    function onClear() {
        if (props.url) {
            getOptions();
        }
    }

    function getOptions(search = null, initial = false) {
        let useFetchHook;
        if (search) {
            useFetchHook = useFetch(`${props.url}`, GET, {search: search});
        } else {
            useFetchHook = useFetch(`${props.url}`, GET);
        }
        useFetchHook.then((response) => {
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

    return (
        <Form.Item
            label={props.label ? <FormLabel>{props.label}</FormLabel> : null}
            name={props.name}
            validateStatus={props.errors[props.name] ? 'error' : null}
            help={props.errors.name ? props.errors[props.name] : null}
            rules={[{required: props.required, message: props.message}]}
            colon={false}
            labelCol={props.size === 'large' || props.size === 'medium' ? {span: 24} : null}
            wrapperCol={props.size === 'large' || props.size === 'medium' ? {span: 24} : null}
        >
            {props.loading ? <CustomInputSkeleton {...props}/> :
                <Select
                    allowClear
                    disabled={props.formDisabled}
                    showSearch
                    onSearch={onSearch}
                    optionFilterProp="children"
                    filterOption={state.filterOption}
                    onClear={onClear}
                    size={props.size ? props.size : 'small'}
                    placeholder={props.placeholder ? props.placeholder : null}
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
