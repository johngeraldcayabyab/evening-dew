import React, {useEffect} from 'react';
import {Form} from "antd";
import {useParams} from "react-router-dom";
import useFormHook from "../../Hooks/useFormHook";
import FormButtons from "../../Components/FormButtons/FormButtons";
import RowForm from "../../Components/Grid/RowForm";
import ColForm from "../../Components/Grid/ColForm";
import CustomForm from "../../Components/CustomForm";
import FormItemText from "../../Components/FormItem/FormItemText";
import ControlPanel from "../../Components/ControlPanel";
import FormCard from "../../Components/FormCard";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {FormContextProvider} from "../../Contexts/FormContext";
import useOptionHook from "../../Hooks/useOptionHook";
import FormItemSelect from "../../Components/FormItem/FormItemSelect";
import NextPreviousRecord from "../../Components/NextPreviousRecord";
import AddressManifest from "./AddressManifest"

const AddressForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, AddressManifest, true);
    const countryOptions = useOptionHook('/api/countries', 'country.country_name');
    const cityOptions = useOptionHook('/api/cities', 'city.name');
    const contactOptions = useOptionHook('/api/contacts', 'contact.name');

    useEffect(() => {
        countryOptions.getInitialOptions(formState);
        cityOptions.getInitialOptions(formState);
        contactOptions.getInitialOptions(formState);
    }, [formState.initialLoad]);

    return (
        <FormContextProvider
            value={{
                id: id,
                manifest: AddressManifest,
                form: form,
                formState: formState,
                formActions: formActions,
                onFinish: formActions.onFinish
            }}
        >
            <CustomForm>
                <ControlPanel
                    topColOneLeft={<CustomBreadcrumb/>}
                    bottomColOneLeft={<FormButtons edit={true} create={true}/>}
                    bottomColTwoRight={<NextPreviousRecord/>}
                />
                <FormCard>
                    <RowForm>
                        <ColForm>
                            <FormItemText
                                label={'Address Name'}
                                name={'address_name'}
                                message={'Please input address name'}
                                required={true}
                                size={'large'}
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
                                label={'Zip'}
                                name={'zip'}
                            />

                            <FormItemSelect
                                label={'Country'}
                                name={'country_id'}
                                {...countryOptions}
                            />

                            <FormItemSelect
                                label={'City'}
                                name={'city_id'}
                                {...cityOptions}
                            />
                        </ColForm>

                        <ColForm>
                            <FormItemSelect
                                label={'Contact'}
                                name={'contact_id'}
                                message={'Please select a contact'}
                                required={true}
                                {...contactOptions}
                            />

                            <FormItemSelect
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
                            />
                        </ColForm>
                    </RowForm>
                </FormCard>
            </CustomForm>
        </FormContextProvider>
    );
};


export default AddressForm;
