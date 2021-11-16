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
import FormItemSelect from "../components/FormItem/FormItemSelect";

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

                                    <FormItemSelect
                                        label={'Type'}
                                        name={'type'}
                                        errors={formState.errors}
                                        message={'Please select a type'}
                                        required={true}
                                        formDisabled={formState.formDisabled}
                                        options={[
                                            {value: 'reference', label: 'Reference measurement for this category'},
                                            {value: 'smaller', label: 'Smaller than the reference measurement'},
                                            {value: 'bigger', label: 'Bigger than the reference measurement'},
                                        ]}
                                    />

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
