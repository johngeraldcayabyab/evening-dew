import {Form} from "antd";
import {useContext} from "react";
import {FormContext} from "../Contexts/FormContext";

const CustomForm = (props) => {
    const formContext = useContext(FormContext);
    return (
        <Form
            form={formContext.form}
            onFinish={formContext.onFinish}
            size={'small'}
            labelAlign={'left'}
            labelCol={{span: 8}}
            labelWrap={true}
            wrapperCol={{span: 16}}
            onValuesChange={(changedValues, allValues) => {
                return formContext.onValuesChange(
                    changedValues,
                    allValues,
                    formContext
                );
            }}
            className={'custom-form'}
        >
            {props.children}
        </Form>
    );
}

export default CustomForm;
