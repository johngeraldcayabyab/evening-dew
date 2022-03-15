import React from 'react';
import {Form} from "antd";
import {useParams} from "react-router-dom";
import useFormState from "../../Hooks/useFormState";
import manifest from "./__manifest__.json";
import FormButtons from "../../components/FormButtons/FormButtons";
import RowForm from "../../components/Grid/RowForm";
import ColForm from "../../components/Grid/ColForm";
import CustomForm from "../../components/CustomForm";
import FormItemText from "../../components/FormItem/FormItemText";
import ControlPanel from "../../components/ControlPanel";
import FormCard from "../../components/FormCard";
import FormItemSelectAjax from "../../components/FormItem/FormItemSelectAjax";
import FormItemSelect from "../../components/FormItem/FormItemSelect";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";

const AddressForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormState(id, form, manifest, true);


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
                            url={'/api/countries/option'}
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
                            url={'/api/contacts/option'}
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
    );
};


export default AddressForm;
