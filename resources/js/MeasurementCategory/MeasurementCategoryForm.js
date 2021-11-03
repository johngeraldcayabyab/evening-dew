import React from 'react';
import {Card, Form, Input, Layout, Skeleton, Space, Spin} from "antd";
import {useParams} from "react-router-dom";
import useFormState from "../Hooks/useFormState";
import manifest from "./__manifest__.json";
import FormButtons from "../components/ActionButtons/FormButtons";
import RowForm from "../components/Grid/RowForm";
import ColForm from "../components/Grid/ColForm";

const MeasurementCategoryForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormState(id, form, manifest);
    return (
        <React.Fragment>
            <Skeleton loading={formState.initialLoad}>
                <Spin spinning={formState.initialLoad === false && formState.loading === true}>
                    <Form
                        form={form}
                        size={'small'}
                        onFinish={formActions.onFinish}
                        initialValues={formState.initialValues}
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
                                        label="Name"
                                        name="name"
                                        validateStatus={formState.errors.name ? 'error' : false}
                                        help={formState.errors.name ? formState.errors.name : false}
                                        rules={[{required: true, message: 'Please input measurement category name'}]}
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

export default MeasurementCategoryForm;
