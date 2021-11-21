import React from 'react';
import {Form, Input} from "antd";
import {useParams} from "react-router-dom";
import useFormState from "../Hooks/useFormState";
import manifest from "./__manifest__.json";
import FormButtons from "../components/ActionButtons/FormButtons";
import RowForm from "../components/Grid/RowForm";
import ColForm from "../components/Grid/ColForm";
import FormLabel from "../components/Typography/FormLabel";
import CustomForm from "../components/CustomForm";
import ControlPanel from "../components/ControlPanel";
import FormCard from "../components/FormCard";

const MenuForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormState(id, form, manifest);

    return (
        <CustomForm
            form={form}
            onFinish={formActions.onFinish}
            initialValues={formState.initialValues}
        >
            <ControlPanel
                bottomColOneLeft={
                    <FormButtons
                        id={id}
                        form={form}
                        formState={formState}
                        formActions={formActions}
                        manifest={manifest}
                    />
                }
            />
            <FormCard>
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
            </FormCard>
        </CustomForm>
    );
};

export default MenuForm;
