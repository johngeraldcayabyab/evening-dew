import React from 'react';
import {Card, Form, Input, InputNumber, Layout, Select, Skeleton, Space, Spin} from "antd";
import {useParams} from "react-router-dom";
import useFormState from "../Hooks/useFormState";
import manifest from "./__manifest__.json";
import FormButtons from "../components/ActionButtons/FormButtons";
import RowForm from "../components/Grid/RowForm";
import ColForm from "../components/Grid/ColForm";
import FormLabel from "../components/Typography/FormLabel";
import CustomForm from "../components/CustomForm";

const MeasurementForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormState(id, form, manifest);
    return (
        <React.Fragment>
            <Skeleton loading={formState.initialLoad}>
                <Spin spinning={formState.initialLoad === false && formState.loading === true}>
                    <CustomForm
                        form={form}
                        onFinish={formActions.onFinish}
                        initialValues={formState.initialValues}
                    >
                        <Layout.Content style={{padding: '5px 5px 5px 0'}}>
                            <FormButtons
                                id={id}
                                form={form}
                                formState={formState}
                                formActions={formActions}
                                manifest={manifest}
                            />
                        </Layout.Content>
                        <Card>
                            <RowForm>
                                <ColForm>
                                    <Form.Item
                                        label={<FormLabel>Name</FormLabel>}
                                        name="name"
                                        validateStatus={formState.errors.name ? 'error' : false}
                                        help={formState.errors.name ? formState.errors.name : false}
                                        rules={[{required: true, message: 'Please input measurement category name'}]}
                                        colon={false}
                                    >
                                        <Input disabled={formState.formDisabled}/>
                                    </Form.Item>

                                    <Form.Item
                                        label={<FormLabel>Type</FormLabel>}
                                        name="type"
                                        validateStatus={formState.errors.type ? 'error' : false}
                                        help={formState.errors.type ? formState.errors.type : false}
                                        rules={[{required: true}]}
                                        colon={false}
                                    >
                                        <Select
                                            allowClear
                                            disabled={formState.formDisabled}
                                        >
                                            <Select.Option value="reference">Reference measurement for this
                                                category</Select.Option>
                                            <Select.Option value="smaller">Smaller than the reference
                                                measurement</Select.Option>
                                            <Select.Option value="bigger" default>Bigger than the reference
                                                measurement</Select.Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        label={<FormLabel>Ratio</FormLabel>}
                                        name="ratio"
                                        validateStatus={formState.errors.ratio ? 'error' : false}
                                        help={formState.errors.ratio ? formState.errors.ratio : false}
                                        rules={[{required: true, message: 'Please input ratio'}]}
                                        colon={false}
                                    >
                                        <InputNumber
                                            disabled={formState.formDisabled}
                                            style={{width: "100%"}}
                                            // defaultValue="1"
                                            // min=""
                                            // max="10"
                                            step="0.00000000000001"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label={<FormLabel>Rounding precision</FormLabel>}
                                        name="rounding_precision"
                                        validateStatus={formState.errors.rounding_precision ? 'error' : false}
                                        help={formState.errors.rounding_precision ? formState.errors.rounding_precision : false}
                                        rules={[{required: true, message: 'Please input rounding precision'}]}
                                        colon={false}
                                    >
                                        <InputNumber
                                            disabled={formState.formDisabled}
                                            style={{width: "100%"}}
                                            step="0.00000000000001"
                                        />
                                    </Form.Item>
                                </ColForm>
                            </RowForm>
                        </Card>
                    </CustomForm>
                </Spin>
            </Skeleton>
        </React.Fragment>
    );
};

export default MeasurementForm;
