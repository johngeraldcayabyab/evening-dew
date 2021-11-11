import React from 'react';
import {Button, Card, Form, Input, Layout, Skeleton, Space, Spin} from "antd";
import {useParams} from "react-router-dom";
import useFormState from "../Hooks/useFormState";
import manifest from "./__manifest__.json";
import FormButtons from "../components/ActionButtons/FormButtons";
import RowForm from "../components/Grid/RowForm";
import ColForm from "../components/Grid/ColForm";
import FormLabel from "../components/Typography/FormLabel";

const MenuForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormState(id, form, manifest);

    return (
        <React.Fragment>
            <Skeleton loading={formState.initialLoad}>
                <Spin spinning={formState.initialLoad === false && formState.loading === true}>
                    <Form
                        form={form}
                        onFinish={formActions.onFinish}
                        initialValues={formState.initialValues}
                        size={'small'}
                        labelAlign={'left'}
                        labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                    >
                        <Layout.Content style={{padding: '5px 5px 5px 0'}}>
                            <Space>
                                <FormButtons
                                    id={id}
                                    form={form}
                                    formState={formState}
                                    formActions={formActions}
                                    manifest={manifest}
                                />
                            </Space>
                        </Layout.Content>
                        <Card>
                            <RowForm>
                                <ColForm>
                                    <Form.Item
                                        label={<FormLabel>Label</FormLabel>}
                                        name="label"
                                        validateStatus={formState.errors.label ? 'error' : false}
                                        help={formState.errors.label ? formState.errors.label : false}
                                        rules={[{required: true, message: 'Please input label name'}]}
                                    >
                                        <Input disabled={formState.formDisabled}/>
                                    </Form.Item>
                                    <Form.Item
                                        label={<FormLabel>Url</FormLabel>}
                                        name="url"
                                        validateStatus={formState.errors.url ? 'error' : false}
                                        help={formState.errors.url ? formState.errors.url : false}
                                        rules={[{required: true, message: 'Please input url'}]}
                                    >
                                        <Input disabled={formState.formDisabled}/>
                                    </Form.Item>
                                </ColForm>
                            </RowForm>
                        </Card>
                    </Form>
                </Spin>
            </Skeleton>
        </React.Fragment>
    );
};

export default MenuForm;
