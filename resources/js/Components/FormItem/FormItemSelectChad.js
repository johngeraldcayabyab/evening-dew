import {Form, Select, Tag} from "antd";
import {useContext, useEffect, useState} from "react";
import CustomInputSkeleton from "../CustomInputSkeleton";
import {formItemFieldProps} from "../../Helpers/form";
import {FormContext} from "../../Contexts/FormContext";
import CustomDropdownMenu from "../CustomDropdownMenu";

const FormItemSelectChad = (props) => {
    const [state, setState] = useState({
        isClear: false
    });
    const formContext = useContext(FormContext);
    const specialFieldProps = {
        allowClear: true,
        showSearch: true,
        onSearch: props.onSearch,
        optionFilterProp: "children",
        filterOption: [],
        onPopupScroll: props.onPopupScroll,
        listHeight: 150,
    };

    if (props.onClear) {
        specialFieldProps.onClear = () => {
            props.onClear();
            setState(() => ({
                isClear: true,
            }));
        }
    }

    if (props.onDropdownVisibleChange) {
        specialFieldProps.onDropdownVisibleChange = (open) => {
            props.onDropdownVisibleChange(open);
        }
    }

    useEffect(() => {
        if (state.isClear) {
            if (props.isListField) {
                let fields = {};
                const options = formContext.form.getFieldsValue(true)[props.listName];
                options[props.fieldKey][props.name] = null;
                fields[props.listName] = options;
                formContext.form.setFieldsValue(fields);
                props.onClear(props.fieldKey);
            } else {
                let fields = {};
                fields[props.name] = null;
                formContext.form.setFieldsValue(fields);
            }
        }
    }, [state.isClear]);

    if (props.dropdownRender) {
        specialFieldProps.dropdownRender = (menu) => {
            if (!props.listName) {
                return (
                    <CustomDropdownMenu
                        menu={menu}
                        {...props.dropdownRender}
                    />
                )
            }
            if (props.listName) {
                return (
                    <CustomDropdownMenu
                        menu={menu}
                        {...props.optionAggregate.aggregate(props.optionAggregate, props.fieldKey, formContext.formState, props.listName)}
                    />
                )
            }
        }
    }

    const [formItemProps, fieldProps] = formItemFieldProps(props, specialFieldProps);

    function isLoading() {
        if (formContext.formState.loading) {
            return true;
        }
        if (props.hasOwnProperty('optionsLoading') && (props.optionsLoading || props.optionsLoading === undefined)) {
            return true;
        }
        return false;
    }

    useEffect(() => {
        if (props.listName) {
            props.addSelf(props.fieldKey);
        }
        return () => {
            if (props.listName) {
                props.removeSelf(props.fieldKey);
            }
        };
    }, []);

    return (
        <Form.Item {...formItemProps}>
            {isLoading() ?
                <CustomInputSkeleton {...props}/> :
                <Select {...fieldProps}>
                    {props.options && props.options.map((option) => {
                        return (
                            <Select.Option key={option.value} value={option.value}>
                                {option.label} {option.tag ? <Tag color="processing">{option.tag}</Tag> : null}
                            </Select.Option>
                        )
                    })}
                </Select>
            }
        </Form.Item>
    )
}

export default FormItemSelectChad;
