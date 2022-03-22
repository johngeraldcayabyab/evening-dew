import {Form, Select} from "antd";
import {useContext} from "react";
import CustomInputSkeleton from "../CustomInputSkeleton";
import {formItemFieldProps} from "../../Helpers/form";
import {FormContext} from "../../Contexts/FormContext";

const FormItemSelectTest = (props) => {
    const formContext = useContext(FormContext);
    const [formItemProps, fieldProps] = formItemFieldProps(props, {
        allowClear: true,
        showSearch: true,
        onSearch: props.onSearch,
        optionFilterProp: "children",
        filterOption: [],
        onClear: props.onClear,
    });

    return (
        <Form.Item {...formItemProps}>
            {formContext.formState.loading ? <CustomInputSkeleton {...props}/> :
                <Select {...fieldProps}>
                    {props.options.map((option) => {
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

export default FormItemSelectTest;
