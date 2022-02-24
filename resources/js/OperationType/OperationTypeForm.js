import React from 'react';
import {Form} from "antd";
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
import FormItemSelectAjaxAdvanced from "../components/FormItem/FormItemSelectAjaxAdvanced";
import FormItemSelect from "../components/FormItem/FormItemSelect";
import FormItemCheckbox from "../components/FormItem/FormItemCheckbox";
import FormItemNumber from "../components/FormItem/FormItemNumber";

const OperationTypeForm = () => {
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
                    <ColForm>
                        <FormItemText
                            form={form}
                            label={'Name'}
                            name={'name'}
                            message={'Please input measurement category name'}
                            required={true}
                            {...formState}
                        />

                        <FormItemSelectAjaxAdvanced
                            form={form}
                            label={'Reference Sequence'}
                            name={'reference_sequence_id'}
                            url={'/api/sequences/option'}
                            {...formState}
                            query={'reference_sequence.name'}
                        />

                        <FormItemText
                            form={form}
                            label={'Code'}
                            name={'code'}
                            message={'Please sequence code'}
                            required={true}
                            {...formState}
                        />

                        <FormItemSelectAjaxAdvanced
                            form={form}
                            label={'Warehouse'}
                            name={'warehouse_id'}
                            url={'/api/warehouses/option'}
                            {...formState}
                            query={'warehouse.name'}
                        />

                        <FormItemSelect
                            form={form}
                            label={'Reservation Method'}
                            name={'reservation_method'}
                            message={'Please select an address type'}
                            required={true}
                            options={[
                                {value: 'at_confirmation', label: 'At Confirmation'},
                                {value: 'manually', label: 'Manually'},
                                {value: 'before_scheduled_date', label: 'Before Scheduled Date'},
                            ]}
                            {...formState}
                        />

                        <FormItemNumber
                            form={form}
                            label={'Reservation Days Before'}
                            name={'reservation_days_before'}
                            {...formState}
                        />

                        <FormItemNumber
                            form={form}
                            label={'Reservation Days Before Priority'}
                            name={'reservation_days_before_priority'}
                            {...formState}
                        />
                    </ColForm>

                    <ColForm>
                        <FormItemSelect
                            form={form}
                            label={'Type Of Operation'}
                            name={'type'}
                            message={'Please select an address type'}
                            required={true}
                            options={[
                                {value: 'receipt', label: 'Receipt'},
                                {value: 'delivery', label: 'Delivery'},
                                {value: 'internal', label: 'Internal'},
                                {value: 'manufacturing', label: 'Manufacturing'},
                            ]}
                            {...formState}
                        />

                        <FormItemSelectAjaxAdvanced
                            form={form}
                            label={'Operation Type For Returns'}
                            name={'operation_type_for_returns_id'}
                            url={'/api/operations_types/option'}
                            {...formState}
                            query={'operation_type_for_returns.name'}
                        />

                        <FormItemCheckbox
                            form={form}
                            label={'Show Detailed Operation'}
                            name={'show_detailed_operation'}
                            {...formState}
                        />

                        <FormItemCheckbox
                            form={form}
                            label={'Pre Fill Detailed Operation'}
                            name={'pre_fill_detailed_operation'}
                            {...formState}
                        />
                    </ColForm>
                </RowForm>


                <RowForm>
                    <ColForm>
                        {/*Traceability*/}
                        <FormItemCheckbox
                            form={form}
                            label={'Create new lots/serial numbers'}
                            name={'create_new_lots_serial_numbers'}
                            {...formState}
                        />

                        <FormItemCheckbox
                            form={form}
                            label={'Use existing lots/serial numbers'}
                            name={'use_existing_lots_serial_numbers'}
                            {...formState}
                        />
                    </ColForm>
                    <ColForm>

                        {/*Locations*/}

                        <FormItemSelectAjaxAdvanced
                            form={form}
                            label={'Default Source Location'}
                            name={'default_source_location_id'}
                            url={'/api/locations/option'}
                            {...formState}
                            query={'default_source_location.name'}
                        />

                        <FormItemSelectAjaxAdvanced
                            form={form}
                            label={'Default Destination Location'}
                            name={'default_destination_location_id'}
                            url={'/api/locations/option'}
                            {...formState}
                            query={'default_destination_location.name'}
                        />
                    </ColForm>
                </RowForm>

            </FormCard>
        </CustomForm>
    );
};

export default OperationTypeForm;
