import React from 'react';
import {Form} from "antd";
import {useParams} from "react-router-dom";
import useFormHook from "../../Hooks/useFormHook";
import manifest from "./__manifest__.json";
import FormButtons from "../../Components/FormButtons/FormButtons";
import RowForm from "../../Components/Grid/RowForm";
import ColForm from "../../Components/Grid/ColForm";
import CustomForm from "../../Components/CustomForm";
import ControlPanel from "../../Components/ControlPanel";
import FormCard from "../../Components/FormCard";
import FormItemText from "../../Components/FormItem/FormItemText";
import FormItemSelectAjax from "../../Components/FormItem/FormItemSelectAjax";
import FormItemSelect from "../../Components/FormItem/FormItemSelect";
import FormItemCheckbox from "../../Components/FormItem/FormItemCheckbox";
import FormItemNumber from "../../Components/FormItem/FormItemNumber";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {FormContextProvider} from "../../Contexts/FormContext";

const OperationTypeForm = () => {
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
                                form={form}
                                label={'Name'}
                                name={'name'}
                                message={'Please input measurement category name'}
                                required={true}
                                {...formState}
                            />

                            <FormItemSelectAjax
                                form={form}
                                label={'Reference Sequence'}
                                name={'reference_sequence_id'}
                                url={'/api/sequences'}
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

                            <FormItemSelectAjax
                                form={form}
                                label={'Warehouse'}
                                name={'warehouse_id'}
                                url={'/api/warehouses'}
                                {...formState}
                                query={'warehouse.name'}
                            />

                            <FormItemSelect
                                form={form}
                                label={'Reservation Method'}
                                name={'reservation_method'}
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

                            <FormItemSelectAjax
                                form={form}
                                label={'Operation Type For Returns'}
                                name={'operation_type_for_returns_id'}
                                url={'/api/operations_types'}
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

                            <FormItemCheckbox
                                form={form}
                                label={'Create new lots/serial numbers for components'}
                                name={'create_new_lots_serial_numbers_for_components'}
                                {...formState}
                            />
                        </ColForm>
                        <ColForm>

                            {/*Locations*/}

                            <FormItemSelectAjax
                                form={form}
                                label={'Default Source Location'}
                                name={'default_source_location_id'}
                                url={'/api/locations'}
                                {...formState}
                                query={'default_source_location.name'}
                            />

                            <FormItemSelectAjax
                                form={form}
                                label={'Default Destination Location'}
                                name={'default_destination_location_id'}
                                url={'/api/locations'}
                                {...formState}
                                query={'default_destination_location.name'}
                            />
                        </ColForm>
                    </RowForm>

                </FormCard>
            </CustomForm>
        </FormContextProvider>
    );
};

export default OperationTypeForm;
