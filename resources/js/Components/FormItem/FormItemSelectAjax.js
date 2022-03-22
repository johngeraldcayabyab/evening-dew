import {Form, Select} from "antd";
import {useContext, useEffect, useState} from "react";
import CustomInputSkeleton from "../CustomInputSkeleton";
import useFetchCatcherHook from "../../Hooks/useFetchCatcherHook";
import useFetchHook from "../../Hooks/useFetchHook";
import {GET} from "../../consts";
import {formItemFieldProps} from "../../Helpers/form";
import {objectHasValue} from "../../Helpers/object";
import CustomFormItemLink from "../CustomFormItemLink";
import {FormContext} from "../../Contexts/FormContext";

const FormItemSelectAjax = (props) => {
    const formContext = useContext(FormContext);
    const useFetch = useFetchHook();
    const fetchCatcher = useFetchCatcherHook();
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
        if (!formContext.formState.initialLoad) {
            let val = null;
            if (objectHasValue(formContext.formState.initialValues)) {
                val = getFieldFromInitialValues();
            }
            getOptions(val);
        }
    }, [formContext.formState.initialLoad]);

    useEffect(() => {
        if (props.search) {
            getOptions(props.search);
        }
    }, [props.search]);

    function getFieldFromInitialValues() {
        let search = formContext.formState.initialValues;
        props.query.split('.').forEach((query) => {
            if (search && query in search) {
                search = search[query];
            } else {
                search = null;
            }
        });
        if ((props.isListField && formContext.formState.id && !formContext.formState.formDisabled) || (props.isListField && !formContext.formState.id && !formContext.formState.formDisabled)) {
            search = formContext.formState.initialValues;
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
        const field = props.query.split('.').slice(-1)[0];
        const params = {
            page_size: 10,
            selected_fields: ['id', 'slug'],
            orderByColumn: field,
            orderByDirection: 'asc',
        };
        if (search) {
            params[field] = search;
        }
        useFetch(`${props.url}`, GET, params).then((response) => {
            const data = response.data;
            setState((prevState) => ({
                ...prevState,
                options: data.map((option) => ({
                    value: option.id,
                    label: option.slug
                }))
            }));
        }).catch((responseErr) => {
            fetchCatcher.get(responseErr);
        });
    }

    return (
        <CustomFormItemLink {...props}>
            <Form.Item {...formItemProps}>
                {formContext.formState.loading ? <CustomInputSkeleton {...props}/> :
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
        </CustomFormItemLink>
    )
}

export default FormItemSelectAjax;
