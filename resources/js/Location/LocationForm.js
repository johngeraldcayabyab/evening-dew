import React from 'react';
import {Divider, Form} from "antd";
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
import FormItemSelectAjax from "../components/FormItem/FormItemSelectAjax";
import FormItemSelect from "../components/FormItem/FormItemSelect";
import FormItemCheckbox from "../components/FormItem/FormItemCheckbox";

const LocationForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormState(id, form, manifest, true);

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
                    <ColForm lg={24}>
                        <FormItemText
                            form={form}
                            label={'Name'}
                            name={'name'}
                            message={'Please input name'}
                            required={true}
                            size={'large'}
                            {...formState}
                        />

                        <FormItemSelectAjax
                            form={form}
                            label={'Parent Category'}
                            name={'parent_location_id'}
                            url={'/api/locations/option'}
                            size={'medium'}
                            {...formState}
                            query={'parent_location.name'}
                        />
                    </ColForm>
                </RowForm>

                <Divider orientation={'left'}>
                    Additional Information
                </Divider>

                <RowForm>
                    <ColForm>
                        <FormItemSelect
                            form={form}
                            label={'Type'}
                            name={'type'}
                            message={'Please select a location type'}
                            required={true}
                            options={[
                                {value: 'vendor', label: 'Vendor'},
                                {value: 'view', label: 'View'},
                                {value: 'internal', label: 'Internal'},
                                {value: 'customer', label: 'Customer'},
                                {value: 'inventory_loss', label: 'Inventory Loss'},
                                {value: 'production', label: 'Production'},
                                {value: 'transit_location', label: 'Transit Location'},
                            ]}
                            {...formState}
                        />

                        <FormItemCheckbox
                            form={form}
                            label={'Is a scrap location?'}
                            name={'is_a_scrap_location'}
                            {...formState}
                        />

                        <FormItemCheckbox
                            form={form}
                            label={'Is a return location?'}
                            name={'is_a_return_location'}
                            {...formState}
                        />
                    </ColForm>
                </RowForm>
            </FormCard>
        </CustomForm>
    );
};

export default LocationForm;
