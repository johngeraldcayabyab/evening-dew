import {Form, Select, Tag} from "antd";
import {useContext, useEffect} from "react";
import CustomInputSkeleton from "../CustomInputSkeleton";
import {formItemFieldProps} from "../../Helpers/form";
import {FormContext} from "../../Contexts/FormContext";
import CustomDropdownMenu from "../CustomDropdownMenu";

const FormItemSelect = (props) => {
    const formContext = useContext(FormContext);
    const specialFieldProps = {
        allowClear: true,
        showSearch: true,
        onSearch: props.onSearch,
        optionFilterProp: "children",
        filterOption: [],
        onClear: props.onClear,
        onPopupScroll: props.onPopupScroll
    };

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

export default FormItemSelect;
