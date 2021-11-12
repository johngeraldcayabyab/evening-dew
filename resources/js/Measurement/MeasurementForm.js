import React from 'react';
import {Card, Form, Layout, Select, Skeleton, Spin} from "antd";
import {useParams} from "react-router-dom";
import useFormState from "../Hooks/useFormState";
import manifest from "./__manifest__.json";
import FormButtons from "../components/ActionButtons/FormButtons";
import RowForm from "../components/Grid/RowForm";
import ColForm from "../components/Grid/ColForm";
import FormLabel from "../components/Typography/FormLabel";
import CustomForm from "../components/CustomForm";
import FormItemText from "../components/FormItem/FormItemText";
import FormItemNumber from "../components/FormItem/FormItemNumber";

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
                                    <FormItemText
                                        label={'Name'}
                                        name={'name'}
                                        errors={formState.errors}
                                        message={'Please input measurement category name'}
                                        required={true}
                                        formDisabled={formState.formDisabled}
                                    />

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

                                    <FormItemNumber
                                        label={'Ratio'}
                                        name={'ratio'}
                                        errors={formState.errors}
                                        message={'Please input ratio'}
                                        required={true}
                                        formDisabled={formState.formDisabled}
                                    />

                                    <FormItemNumber
                                        label={'Rounding precision'}
                                        name={'rounding_precision'}
                                        errors={formState.errors}
                                        message={'Please input rounding precision'}
                                        required={true}
                                        formDisabled={formState.formDisabled}
                                    />
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
