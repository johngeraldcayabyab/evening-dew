import React from 'react';
import {Button, Form, Input} from "antd";
import {useParams} from "react-router-dom";
import useInitialValues from "../Hooks/useInitialValues";
import manifest from "./__manifest__.json";

const MenuForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [errors, onFinish] = useInitialValues(id, form, manifest);

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            onFinish={onFinish}
        >
            <Form.Item
                label="Name"
                name="name"
                validateStatus={errors.name ? 'error' : false}
                help={errors.name ? errors.name : false}
                rules={[{required: true, message: 'Please input measure name'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default MenuForm;
