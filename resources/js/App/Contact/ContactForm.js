import React from 'react';
import {Form} from "antd";
import {useParams} from "react-router-dom";
import useFormHook from "../../Hooks/useFormHook";
import manifest from "./__manifest__.json";
import FormButtons from "../../Components/FormButtons/FormButtons";
import RowForm from "../../Components/Grid/RowForm";
import ColForm from "../../Components/Grid/ColForm";
import CustomForm from "../../Components/CustomForm";
import FormItemText from "../../Components/FormItem/FormItemText";
import ControlPanel from "../../Components/ControlPanel";
import FormCard from "../../Components/FormCard";
import FormItemUpload from "../../Components/FormItem/FormItemUpload";
import FormItemSelectAjax from "../../Components/FormItem/FormItemSelectAjax";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";

const ContactForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest, true);
    return (
        <CustomForm
            form={form}
            onFinish={formActions.onFinish}
        >
            <ControlPanel
                topColOneLeft={<CustomBreadcrumb formState={formState}/>}
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
                            form={form}
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
                            form={form}
                            name={'avatar'}
                            {...formState}
                        />
                    </ColForm>
                </RowForm>


                <RowForm>
                    <ColForm>
                        <FormItemText
                            form={form}
                            label={'Street 1'}
                            name={'street_one'}
                            {...formState}
                        />

                        <FormItemText
                            form={form}
                            label={'Street 2'}
                            name={'street_two'}
                            {...formState}
                        />

                        <FormItemText
                            form={form}
                            label={'City'}
                            name={'city'}
                            {...formState}
                        />

                        <FormItemText
                            form={form}
                            label={'State'}
                            name={'state'}
                            {...formState}
                        />

                        <FormItemText
                            form={form}
                            label={'Zip'}
                            name={'zip'}
                            {...formState}
                        />

                        <FormItemSelectAjax
                            form={form}
                            label={'Country'}
                            name={'country_id'}
                            url={'/api/countries'}
                            {...formState}
                            query={'country.country_name'}
                        />

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
