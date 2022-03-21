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
import FormItemSelectAjax from "../../Components/FormItem/FormItemSelectAjax";
import FormItemSelect from "../../Components/FormItem/FormItemSelect";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {FormContextProvider} from "../../Contexts/FormContext";

const AddressForm = () => {
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
                <FormCard {...formState}>
                    <RowForm>
                        <ColForm>
                            <FormItemText
                                form={form}
                                label={'Address Name'}
                                name={'address_name'}
                                message={'Please input address name'}
                                required={true}
                                size={'large'}
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
                        </ColForm>

                        <ColForm>
                            <FormItemSelectAjax
                                form={form}
                                label={'Contact'}
                                name={'contact_id'}
                                message={'Please select a contact'}
                                required={true}
                                url={'/api/contacts'}
                                {...formState}
                                query={'contact.name'}
                            />

                            <FormItemSelect
                                form={form}
                                label={'Type'}
                                name={'type'}
                                message={'Please select an address type'}
                                required={true}
                                options={[
                                    {value: 'default', label: 'Default'},
                                    {value: 'invoice', label: 'Invoice'},
                                    {value: 'delivery', label: 'Delivery'},
                                    {value: 'others', label: 'Others'},
                                    {value: 'private', label: 'Private'},
                                ]}
                                {...formState}
                            />
                        </ColForm>
                    </RowForm>
                </FormCard>
            </CustomForm>
        </FormContextProvider>
    );
};


export default AddressForm;
