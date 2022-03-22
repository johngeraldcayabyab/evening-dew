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
import {FormContextProvider} from "../../Contexts/FormContext";

const ContactForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest, true);
    return (
        <FormContextProvider
            value={{
                id: id,
                manifest: manifest,
                form: form,
                formState: formState,
                formActions: formActions,
                onFinish: formActions.onFinish
            }}
        >
            <CustomForm>
                <ControlPanel
                    topColOneLeft={<CustomBreadcrumb/>}
                    bottomColOneLeft={<FormButtons/>}
                />
                <FormCard>
                    <RowForm>
                        <ColForm>
                            <FormItemText
                                label={'Name'}
                                name={'name'}
                                message={'Please input name'}
                                required={true}
                                size={'large'}
                            />
                        </ColForm>

                        <ColForm>
                            <FormItemUpload
                                name={'avatar'}
                            />
                        </ColForm>
                    </RowForm>


                    <RowForm>
                        <ColForm>
                            <FormItemText
                                label={'Street 1'}
                                name={'street_one'}
                            />

                            <FormItemText
                                label={'Street 2'}
                                name={'street_two'}
                            />

                            <FormItemText
                                label={'City'}
                                name={'city'}
                            />

                            <FormItemText
                                label={'State'}
                                name={'state'}
                            />

                            <FormItemText
                                label={'Zip'}
                                name={'zip'}
                            />

                            <FormItemSelectAjax
                                label={'Country'}
                                name={'country_id'}
                                url={'/api/countries'}
                                query={'country.country_name'}
                            />

                            <FormItemText
                                label={'Tax ID'}
                                name={'tax_id'}
                            />
                        </ColForm>

                        <ColForm>
                            <FormItemText
                                label={'Phone'}
                                name={'phone'}
                            />

                            <FormItemText
                                label={'Mobile'}
                                name={'mobile'}
                            />

                            <FormItemText
                                label={'Email'}
                                name={'email'}
                            />

                            <FormItemText
                                label={'Website'}
                                name={'website'}
                            />
                        </ColForm>
                    </RowForm>
                </FormCard>
            </CustomForm>
        </FormContextProvider>
    );
};


export default ContactForm;
