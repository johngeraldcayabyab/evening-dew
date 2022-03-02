import {Form, Select} from "antd";
import {useEffect, useState} from "react";
import CustomInputSkeleton from "../CustomInputSkeleton";
import useFetchCatcher from "../../Hooks/useFetchCatcher";
import useFetchHook from "../../Hooks/useFetchHook";
import {GET} from "../../consts";
import {formItemFieldProps} from "../../Helpers/formItem";
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
            console.log('is initial load trigger');
        }
    }, [props.initialLoad]);

    useEffect(() => {
        /**
         * The issue is because this is not working
         * and the removed sales order lines is getting re-queried because it's
         * still part of the initialValues
         */
        if (props.search) {
            getOptions(props.search);
            console.log('is search trigger', props.search);
        }
    }, [props.search]);

    function getQueryFromInitialValue() {
        let search = props.initialValues;
        /**
         * should be called "initial search" instead of "query"
         */
        props.query.split('.').forEach((query) => {
            if (search && query in search) {
                search = search[query];
            } else {
                search = null;
            }
        });
        /**
         * Okay now we know it's a list field
         *
         * There are three types of initial values for list fields
         *
         * 1) One is the "main" outside the fields object
         * 2) Second is for "create" mode and "inside" the fields object (rare but possible)
         * 3) Third is the "edit" mode that gives it actual values
         *
         */
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
