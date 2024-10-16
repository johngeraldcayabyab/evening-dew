import {Form, Select, Tag} from "antd";
import {useContext, useEffect, useRef, useState} from "react";
import CustomInputSkeleton from "../CustomInputSkeleton";
import {FormContext} from "../../Contexts/FormContext";
import CustomDropdownMenu from "../CustomDropdownMenu";
import useFieldHook from "../../Hooks/useFieldHook"

const FormItemSelect = (props) => {
    const selectRef = useRef(null);
    const [state, setState] = useState({
        isClear: false
    });
    const formContext = useContext(FormContext);
    const specialFieldProps = {
        allowClear: true,
        showSearch: true,
        onSearch: props.onSearch,
        optionFilterProp: "children",
        filterOption: false,
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
            setState({isClear: false});
        }
    }, [state.isClear]);

    if (props.dropdownRender) {
        specialFieldProps.dropdownRender = (menu) => {
            if (!props.listName) {
                return (
                    <CustomDropdownMenu
                        menu={menu}
                        {...props.dropdownRender}
                        selectRef={selectRef}
                        selectProps={props}
                    />
                )
            }
            if (props.listName) {
                return (
                    <CustomDropdownMenu
                        menu={menu}
                        {...props.optionAggregate.aggregate(props.optionAggregate, props.fieldKey, formContext)}
                        selectRef={selectRef}
                        selectProps={props}
                    />
                )
            }
        }
    }

    const [formItemProps, fieldProps] = useFieldHook(props, specialFieldProps);

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
            if (props.addSelf) {
                props.addSelf(props.fieldKey);
            }
        }
        return () => {
            if (props.listName) {
                if (props.removeSelf) {
                    props.removeSelf(props.fieldKey);
                }
            }
        };
    }, []);

    const options = props.options ? props.options.map((option) => {
        if (option.tag) {
            option.label = <span>{option.label} {option.tag ? <Tag color="processing">{option.tag}</Tag> : ''}</span>;
        }
        delete option.tag;
        return option;
    }) : [];

    return (
        <Form.Item {...formItemProps}>
            {isLoading() ? <CustomInputSkeleton {...props}/> :
                <Select {...fieldProps} options={options} ref={selectRef}/>}
        </Form.Item>
    )
}

export default FormItemSelect;
