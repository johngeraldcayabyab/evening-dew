import {Form} from "antd";

const CustomForm = (props) => {
    return (
        <Form
            form={props.form}
            onFinish={props.onFinish}
            size={'small'}
            labelAlign={'left'}
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
        >
            {props.children}
        </Form>
    );
}

export default CustomForm;
