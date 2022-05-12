import React, {useEffect} from 'react';
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
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {FormContextProvider} from "../../Contexts/FormContext";
import useOptionHook from "../../Hooks/useOptionHook";
import FormItemSelect from "../../Components/FormItem/FormItemSelect";

const ContactForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest, true);
    const countryOptions = useOptionHook('/api/countries', 'country.country_name');
    const regionOptions = useOptionHook('/api/regions', 'regions.region_name');

    useEffect(() => {
        countryOptions.getInitialOptions(formState);
        regionOptions.getInitialOptions(formState);
    }, [formState.initialLoad]);

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
                                label={'Address'}
                                name={'address'}
                            />
                            <FormItemText
                                label={'City'}
                                name={'city'}
                            />
                            <FormItemText
                                label={'Zip'}
                                name={'zip'}
                            />
                            <FormItemSelect
                                label={'Country'}
                                name={'country_id'}
                                {...countryOptions}
                            />

                            <FormItemSelect
                                label={'Region'}
                                name={'region_id'}
                                {...regionOptions}
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
