import React from 'react';
import {Form} from "antd";
import {useParams} from "react-router-dom";
import useFormState from "../Hooks/useFormState";
import manifest from "./__manifest__.json";
import FormButtons from "../components/ActionButtons/FormButtons";
import RowForm from "../components/Grid/RowForm";
import ColForm from "../components/Grid/ColForm";
import CustomForm from "../components/CustomForm";
import ControlPanel from "../components/ControlPanel";
import FormCard from "../components/FormCard";
import FormItemText from "../components/FormItem/FormItemText";

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
                        <FormItemText
                            label={'Label'}
                            name={'name'}
                            errors={formState.errors}
                            message={'Please input label name'}
                            required={true}
                            formDisabled={formState.formDisabled}
                        />

                        <FormItemText
                            label={'Url'}
                            name={'url'}
                            errors={formState.errors}
                            message={'Please input url'}
                            required={true}
                            formDisabled={formState.formDisabled}
                        />
                    </ColForm>
                </RowForm>
            </FormCard>
        </CustomForm>
    );
};

export default MenuForm;
