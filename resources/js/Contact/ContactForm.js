import React from 'react';
import {Form} from "antd";
import {useParams} from "react-router-dom";
import useFormState from "../Hooks/useFormState";
import manifest from "./__manifest__.json";
import FormButtons from "../components/FormButtons/FormButtons";
import RowForm from "../components/Grid/RowForm";
import ColForm from "../components/Grid/ColForm";
import CustomForm from "../components/CustomForm";
import FormItemText from "../components/FormItem/FormItemText";
import ControlPanel from "../components/ControlPanel";
import FormCard from "../components/FormCard";
import FormItemUpload from "../components/FormItem/FormItemUpload";

const ContactForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormState(id, form, manifest);
    return (
        <CustomForm
            form={form}
            onFinish={formActions.onFinish}
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
                    </ColForm>

                    <ColForm>
                        <FormItemUpload
                            name={'avatar'}
                            form={form}
                            {...formState}
                        />
                    </ColForm>
                </RowForm>


                <RowForm>
                    <ColForm>
                        <FormItemText
                            label={'Tax ID'}
                            name={'tax_id'}
                            {...formState}
                        />
                    </ColForm>

                    <ColForm>
                        <FormItemText
                            label={'Phone'}
                            name={'phone'}
                            {...formState}
                        />

                        <FormItemText
                            label={'Mobile'}
                            name={'mobile'}
                            {...formState}
                        />

                        <FormItemText
                            label={'Email'}
                            name={'email'}
                            {...formState}
                        />

                        <FormItemText
                            label={'Website'}
                            name={'website'}
                            {...formState}
                        />
                    </ColForm>
                </RowForm>
            </FormCard>
        </CustomForm>
    );
};


export default ContactForm;
