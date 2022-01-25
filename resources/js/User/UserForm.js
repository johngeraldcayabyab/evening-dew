import React from 'react';
import {Form} from "antd";
import {useParams} from "react-router-dom";
import useFormState from "../Hooks/useFormState";
import manifest from "./__manifest__.json";
import FormButtons from "../components/FormButtons/FormButtons";
import RowForm from "../components/Grid/RowForm";
import ColForm from "../components/Grid/ColForm";
import CustomForm from "../components/CustomForm";
import ControlPanel from "../components/ControlPanel";
import FormCard from "../components/FormCard";
import FormItemText from "../components/FormItem/FormItemText";

const UserForm = () => {
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
            <FormCard {...formState}>
                <RowForm>
                    <ColForm>
                        <FormItemText
                            label={'Name'}
                            name={'name'}
                            message={'Please input name'}
                            required={true}
                            size={'large'}
                            {...formState}
                        />

                        <FormItemText
                            label={'Email'}
                            name={'email'}
                            message={'Please input email'}
                            required={true}
                            size={'medium'}
                            {...formState}
                        />
                    </ColForm>
                </RowForm>
            </FormCard>
        </CustomForm>
    );
};

export default UserForm;
