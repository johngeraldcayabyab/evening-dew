import React from 'react';
import {Card, Form, Input, Skeleton, Spin} from "antd";
import {useParams} from "react-router-dom";
import useFormState from "../Hooks/useFormState";
import manifest from "./__manifest__.json";
import FormButtons from "../components/ActionButtons/FormButtons";
import RowForm from "../components/Grid/RowForm";
import ColForm from "../components/Grid/ColForm";
import FormLabel from "../components/Typography/FormLabel";
import CustomForm from "../components/CustomForm";
import ControlPanel from "../components/ControlPanel";

const MeasurementCategoryForm = () => {
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
                        <ControlPanel
                            bottomLeft={
                                <FormButtons
                                    id={id}
                                    form={form}
                                    formState={formState}
                                    formActions={formActions}
                                    manifest={manifest}
                                />
                            }
                        />

                        <Card style={{
                            minWidth: '650px',
                            maxWidth: '1140px',
                            minHeight: '330px',
                            margin: '12px auto 0 auto',
                        }}>
                            <RowForm>
                                <ColForm>
                                    <Form.Item
                                        label={<FormLabel>Name</FormLabel>}
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
                    </CustomForm>
                </Spin>
            </Skeleton>
        </React.Fragment>
    );
};

export default MeasurementCategoryForm;
