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
import FormItemSelectAjax from "../components/FormItem/FormItemSelectAjax";
import FormItemSelect from "../components/FormItem/FormItemSelect";

const AddressForm = () => {
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
                            label={'Street 1'}
                            name={'street_1'}
                            {...formState}
                        />

                        <FormItemText
                            label={'Street 2'}
                            name={'street_2'}
                            {...formState}
                        />

                        <FormItemText
                            label={'City'}
                            name={'city'}
                            {...formState}
                        />

                        <FormItemText
                            label={'State'}
                            name={'state'}
                            {...formState}
                        />

                        <FormItemText
                            label={'Zip'}
                            name={'zip'}
                            {...formState}
                        />

                        <FormItemSelectAjax
                            label={'Country'}
                            name={'country_id'}
                            url={'/api/countries/option'}
                            {...formState}
                        />
                    </ColForm>

                    <ColForm>
                        <FormItemSelectAjax
                            label={'Contact'}
                            name={'contact_id'}
                            url={'/api/contacts/option'}
                            {...formState}
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
                            {...formState}
                        />
                    </ColForm>
                </RowForm>
            </FormCard>
        </CustomForm>
    );
};


export default AddressForm;
