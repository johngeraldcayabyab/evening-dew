import React from 'react';
import {Button, Card, Form, Input, Layout, Skeleton, Space} from "antd";
import {useParams} from "react-router-dom";
import useFormState from "../Hooks/useFormState";
import manifest from "./__manifest__.json";
import CreateButton from "../components/CreateButton";
import EditButton from "../components/EditButton";
import SaveButton from "../components/SaveButton";
import DiscardButton from "../components/DiscardButton";

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
                            <EditButton id={id} form={form} formState={formState} formActions={formActions} manifest={manifest}/>
                            <SaveButton id={id} form={form} formState={formState} formActions={formActions} manifest={manifest}/>
                            <DiscardButton id={id} form={form} formState={formState} formActions={formActions} manifest={manifest}/>
                            <CreateButton id={id} form={form} formState={formState} formActions={formActions} manifest={manifest}/>
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
