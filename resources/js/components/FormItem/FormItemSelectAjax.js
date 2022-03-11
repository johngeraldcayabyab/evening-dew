import {Form, Select} from "antd";
import {useEffect, useState} from "react";
import CustomInputSkeleton from "../CustomInputSkeleton";
import useFetchCatcher from "../../Hooks/useFetchCatcher";
import useFetchHook from "../../Hooks/useFetchHook";
import {GET} from "../../consts";
import {formItemFieldProps} from "../../Helpers/form";
import {objectHasValue} from "../../Helpers/object";

const FormItemSelectAjax = (props) => {
    const [useFetch, fetchAbort] = useFetchHook();
    const fetchCatcher = useFetchCatcher();
    const [state, setState] = useState({
        options: [],
        filterOption: []
    });
    const [formItemProps, fieldProps] = formItemFieldProps(props, {
        allowClear: true,
        showSearch: true,
        onSearch: onSearch,
        optionFilterProp: "children",
        filterOption: state.filterOption,
        onClear: onClear,
    });

    useEffect(() => {
        return () => {
            fetchAbort();
        };
    }, []);

    useEffect(() => {
        if (!props.initialLoad) {
            let val = null;
            if (objectHasValue(props.initialValues)) {
                val = getQueryFromInitialValue();
            }
            getOptions(val);
        }
    }, [props.initialLoad]);

    useEffect(() => {
        if (props.search) {
            getOptions(props.search);
        }
    }, [props.search]);

    function getQueryFromInitialValue() {
        let search = props.initialValues;
        props.query.split('.').forEach((query) => {
            if (search && query in search) {
                search = search[query];
            } else {
                search = null;
            }
        });
        if ((props.isListField && props.id && !props.formDisabled) || (props.isListField && !props.id && !props.formDisabled)) {
            search = props.initialValues;
            props.query.split('.').slice(-2).forEach((query) => {
                if (search && query in search) {
                    search = search[query];
                } else {
                    search = null;
                }
            });
        }

        return search;
    }

    function onSearch(search) {
        getOptions(search);
    }

    function onClear() {
        if (props.url) {
            getOptions();
        }
    }

    function getOptions(search = null) {
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

export default FormItemSelectAjax;
