import React from 'react';
import {Button, Form, Input, Skeleton} from "antd";
import {useParams} from "react-router-dom";
import useFormState from "../Hooks/useFormState";
import manifest from "./__manifest__.json";

const MeasureCategoryForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormState(id, form, manifest);

    return (
        <Skeleton loading={formState.loading}>
            <Form
                form={form}
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                onFinish={formActions.onFinish}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    validateStatus={formState.errors.name ? 'error' : false}
                    help={formState.errors.name ? formState.errors.name : false}
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
        </Skeleton>
    );
};

export default MeasureCategoryForm;
