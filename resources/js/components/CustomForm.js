import {Form} from "antd";

const CustomForm = (props) => {
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
