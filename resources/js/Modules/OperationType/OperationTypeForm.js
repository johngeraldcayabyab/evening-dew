import React, {useEffect} from 'react';
import {Form} from "antd";
import {useParams} from "react-router-dom";
import useFormHook from "../../Hooks/useFormHook";
import manifest from "./operation_type_manifest.json";
import FormButtons from "../../Components/FormButtons/FormButtons";
import RowForm from "../../Components/Grid/RowForm";
import ColForm from "../../Components/Grid/ColForm";
import CustomForm from "../../Components/CustomForm";
import ControlPanel from "../../Components/ControlPanel";
import FormCard from "../../Components/FormCard";
import FormItemText from "../../Components/FormItem/FormItemText";
import FormItemSelect from "../../Components/FormItem/FormItemSelect";
import FormItemCheckbox from "../../Components/FormItem/FormItemCheckbox";
import FormItemNumber from "../../Components/FormItem/FormItemNumber";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {FormContextProvider} from "../../Contexts/FormContext";
import useOptionHook from "../../Hooks/useOptionHook";
import NextPreviousRecord from "../../Components/NextPreviousRecord";

const OperationTypeForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest, true);
    const referenceSequenceOptions = useOptionHook('/api/sequences', 'reference_sequence.name');
    const warehouseOptions = useOptionHook('/api/warehouses', 'warehouse.name');
    const operationTypeForReturnOptions = useOptionHook('/api/operations_types', 'operation_type_for_returns.name');
    const defaultSourceLocationOptions = useOptionHook('/api/locations', 'default_source_location.name');
    const defaultDestinationLocationOptions = useOptionHook('/api/locations', 'default_destination_location.name');

    useEffect(() => {
        referenceSequenceOptions.getInitialOptions(formState);
        warehouseOptions.getInitialOptions(formState);
        operationTypeForReturnOptions.getInitialOptions(formState);
        defaultSourceLocationOptions.getInitialOptions(formState);
        defaultDestinationLocationOptions.getInitialOptions(formState);
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
                    bottomColTwoRight={<NextPreviousRecord/>}
                />
                <FormCard>
                    <RowForm>
                        <ColForm>
                            <FormItemText
                                label={'Name'}
                                name={'name'}
                                message={'Please input measurement category name'}
                                required={true}
                            />

                            <FormItemSelect
                                label={'Reference Sequence'}
                                name={'reference_sequence_id'}
                                {...referenceSequenceOptions}
                            />

                            <FormItemText
                                label={'Code'}
                                name={'code'}
                                message={'Please sequence code'}
                                required={true}
                            />

                            <FormItemSelect
                                label={'Warehouse'}
                                name={'warehouse_id'}
                                {...warehouseOptions}
                            />

                            <FormItemSelect
                                label={'Reservation Method'}
                                name={'reservation_method'}
                                options={[
                                    {value: 'at_confirmation', label: 'At Confirmation'},
                                    {value: 'manually', label: 'Manually'},
                                    {value: 'before_scheduled_date', label: 'Before Scheduled Date'},
                                ]}
                            />

                            <FormItemNumber
                                label={'Reservation Days Before'}
                                name={'reservation_days_before'}
                            />

                            <FormItemNumber
                                label={'Reservation Days Before Priority'}
                                name={'reservation_days_before_priority'}
                            />
                        </ColForm>

                        <ColForm>
                            <FormItemSelect
                                label={'Type Of Operation'}
                                name={'type'}
                                message={'Please select an address type'}
                                required={true}
                                options={[
                                    {value: 'receipt', label: 'Receipt'},
                                    {value: 'delivery', label: 'Delivery'},
                                    {value: 'internal', label: 'Internal'},
                                    {value: 'manufacturing', label: 'Manufacturing'},
                                    {value: 'adjustment', label: 'Adjustment'},
                                ]}
                            />

                            <FormItemSelect
                                label={'Operation Type For Returns'}
                                name={'operation_type_for_returns_id'}
                                {...operationTypeForReturnOptions}
                            />

                            <FormItemCheckbox
                                label={'Show Detailed Operation'}
                                name={'show_detailed_operation'}
                            />

                            <FormItemCheckbox
                                label={'Pre Fill Detailed Operation'}
                                name={'pre_fill_detailed_operation'}
                            />
                        </ColForm>
                    </RowForm>


                    <RowForm>
                        <ColForm>
                            {/*Traceability*/}
                            <FormItemCheckbox
                                label={'Create new lots/serial numbers'}
                                name={'create_new_lots_serial_numbers'}
                            />

                            <FormItemCheckbox
                                label={'Use existing lots/serial numbers'}
                                name={'use_existing_lots_serial_numbers'}
                            />

                            <FormItemCheckbox
                                label={'Create new lots/serial numbers for components'}
                                name={'create_new_lots_serial_numbers_for_components'}
                            />
                        </ColForm>
                        <ColForm>
                            {/*Locations*/}
                            <FormItemSelect
                                label={'Default Source Location'}
                                name={'default_source_location_id'}
                                {...defaultSourceLocationOptions}
                            />

                            <FormItemSelect
                                label={'Default Destination Location'}
                                name={'default_destination_location_id'}
                                {...defaultDestinationLocationOptions}
                            />
                        </ColForm>
                    </RowForm>

                </FormCard>
            </CustomForm>
        </FormContextProvider>
    );
};

export default OperationTypeForm;
