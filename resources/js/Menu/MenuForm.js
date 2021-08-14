import React from 'react';
import {Button, Form, Input} from "antd";
import {useParams} from "react-router-dom";
import useFormState from "../Hooks/useFormState";
import manifest from "./__manifest__.json";

const MenuForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormState(id, form, manifest);

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            onFinish={formActions.onFinish}
        >
            <Form.Item
                label="Label"
                name="label"
                validateStatus={formState.errors.label ? 'error' : false}
                help={formState.errors.label ? formState.errors.label : false}
                rules={[{required: true, message: 'Please input measure name'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Url"
                name="url"
                validateStatus={formState.errors.url ? 'error' : false}
                help={formState.errors.url ? formState.errors.url : false}
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
