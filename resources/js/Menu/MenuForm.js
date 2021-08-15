import React from 'react';
import {Button, Card, Form, Input, Layout, Skeleton, Space} from "antd";
import {useParams} from "react-router-dom";
import useFormState from "../Hooks/useFormState";
import manifest from "./__manifest__.json";

const MenuForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormState(id, form, manifest);

    return (
        <React.Fragment>
            <Layout.Content style={{padding:'5px 5px 5px 0'}}>
                <Space>
                    <Button type="primary" size={'small'}>Create</Button>
                    <Button type="primary" size={'small'}>Create</Button>
                    <Button type="primary" size={'small'}>Create</Button>
                </Space>
            </Layout.Content>
            <Card>
                <Skeleton loading={formState.loading}>
                    <Form
                        form={form}
                        size={'small'}
                        labelAlign={'left'}
                        labelCol={{span: 4}}
                        wrapperCol={{span: 20}}
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
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Skeleton>
            </Card>
        </React.Fragment>
    );
};

export default MenuForm;
