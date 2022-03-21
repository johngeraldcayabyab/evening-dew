import {Form} from "antd";
import {useContext} from "react";
import {FormContext} from "../Contexts/FormContext";

const CustomForm = (props) => {
    const formContext = useContext(FormContext);

    return (
        <Form
            form={props.form}
            onFinish={props.onFinish}
            size={'small'}
            labelAlign={'left'}
            labelCol={{span: 8}}
            labelWrap={true}
            wrapperCol={{span: 16}}
            onValuesChange={props.onValuesChange}
        >
            {props.children}
        </Form>
    );
}

export default CustomForm;
