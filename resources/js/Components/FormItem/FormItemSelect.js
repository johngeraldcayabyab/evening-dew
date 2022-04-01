import {Form, Select} from "antd";
import {useContext, useEffect} from "react";
import CustomInputSkeleton from "../CustomInputSkeleton";
import {formItemFieldProps} from "../../Helpers/form";
import {FormContext} from "../../Contexts/FormContext";

const FormItemSelect = (props) => {
    const formContext = useContext(FormContext);
    const [formItemProps, fieldProps] = formItemFieldProps(props, {
        allowClear: true,
        showSearch: true,
        onSearch: props.onSearch,
        optionFilterProp: "children",
        filterOption: [],
        onClear: props.onClear,
        dropdownRender: props.dropdownRender,
    });

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
            {formContext.formState.loading || props.optionsLoading ? <CustomInputSkeleton {...props}/> :
                <Select {...fieldProps}>
                    {props.options && props.options.map((option) => {
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

export default FormItemSelect;
