import React from 'react';
import {Card, Form, Input, Layout, Skeleton, Space} from "antd";
import {useParams} from "react-router-dom";
import useFormState from "../Hooks/useFormState";
import manifest from "./__manifest__.json";
import ActionButtons from "../components/ActionButtons/ActionButtons";

const MeasureCategoryForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormState(id, form, manifest);
    return (
        <React.Fragment>
            <Skeleton loading={formState.loading}>
                <Form
                    form={form}
                    size={'small'}
                    onFinish={formActions.onFinish}
                    initialValues={formState.initialValues}
                >
                    <Layout.Content style={{padding: '5px 5px 5px 0'}}>
                        <Space>
                            <ActionButtons id={id} form={form} formState={formState} formActions={formActions} manifest={manifest} />
                        </Space>
                    </Layout.Content>
                    <Card>
                        <Form.Item
                            label="Name"
                            name="name"
                            validateStatus={formState.errors.name ? 'error' : false}
                            help={formState.errors.name ? formState.errors.name : false}
                            rules={[{required: true, message: 'Please input measure name'}]}
                        >
                            <Input disabled={formState.formDisabled}/>
                        </Form.Item>
                    </Card>
                </Form>
            </Skeleton>
        </React.Fragment>
    );
};

export default MeasureCategoryForm;
