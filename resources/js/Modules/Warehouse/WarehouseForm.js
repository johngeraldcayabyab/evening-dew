import React, {useEffect} from 'react';
import {Divider, Form, Tabs} from "antd";
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
import FormItemCheckbox from "../../Components/FormItem/FormItemCheckbox";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {FormContextProvider} from "../../Contexts/FormContext";
import useOptionHook from "../../Hooks/useOptionHook";
import FormItemSelectTest from "../../Components/FormItem/FormItemSelectTest";

const {TabPane} = Tabs;

const WarehouseForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest, true);

    const viewLocationOptions = useOptionHook('/api/locations', 'view_location.name');
    const stockLocationOptions = useOptionHook('/api/locations', 'stock_location.name');
    const inputLocationOptions = useOptionHook('/api/locations', 'input_location.name');
    const qualityControlLocationOptions = useOptionHook('/api/locations', 'quality_control_location.name');
    const packingLocationOptions = useOptionHook('/api/locations', 'packing_location.name');
    const outputLocationOptions = useOptionHook('/api/locations', 'output_location.name');
    const stockAfterManufacturingLocationOptions = useOptionHook('/api/locations', 'stock_after_manufacturing_location.name');
    const pickingBeforeManufacturingLocationOptions = useOptionHook('/api/locations', 'picking_before_manufacturing_location.name');
    const inTypeOptions = useOptionHook('/api/operations_types', 'in_type.name');
    const internalTypeOptions = useOptionHook('/api/operations_types', 'internal_type.name');
    const pickTypeOptions = useOptionHook('/api/operations_types', 'pick_type.name');
    const packTypeOptions = useOptionHook('/api/operations_types', 'pack_type.name');
    const outTypeOptions = useOptionHook('/api/operations_types', 'out_type.name');
    const stockAfterManufacturingOperationTypeOptions = useOptionHook('/api/operations_types', 'stock_after_manufacturing_operation_type.name');
    const pickingBeforeManufacturingOperationTypeOptions = useOptionHook('/api/operations_types', 'picking_before_manufacturing_operation_type.name');
    const manufacturingOperationTypeOperationTypeOptions = useOptionHook('/api/operations_types', 'manufacturing_operation_type.name');

    useEffect(() => {
        viewLocationOptions.getInitialOptions(formState);
        stockLocationOptions.getInitialOptions(formState);
        inputLocationOptions.getInitialOptions(formState);
        qualityControlLocationOptions.getInitialOptions(formState);
        packingLocationOptions.getInitialOptions(formState);
        outputLocationOptions.getInitialOptions(formState);
        stockAfterManufacturingLocationOptions.getInitialOptions(formState);
        pickingBeforeManufacturingLocationOptions.getInitialOptions(formState);
        inTypeOptions.getInitialOptions(formState);
        internalTypeOptions.getInitialOptions(formState);
        pickTypeOptions.getInitialOptions(formState);
        packTypeOptions.getInitialOptions(formState);
        outTypeOptions.getInitialOptions(formState);
        stockAfterManufacturingOperationTypeOptions.getInitialOptions(formState);
        pickingBeforeManufacturingOperationTypeOptions.getInitialOptions(formState);
        manufacturingOperationTypeOperationTypeOptions.getInitialOptions(formState);
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
                        <ColForm lg={24}>
                            <FormItemText
                                label={'Name'}
                                name={'name'}
                                message={'Please input name'}
                                required={true}
                                size={'large'}
                            />

                            <FormItemText
                                label={'Short Name'}
                                name={'short_name'}
                                message={'Please input short_name'}
                                required={true}
                                size={'medium'}
                            />
                        </ColForm>
                    </RowForm>

                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Warehouse Configuration" key="1">
                            <RowForm>
                                <ColForm>
                                    <FormItemCheckbox
                                        label={'Manufacture to resupply'}
                                        name={'manufacture_to_resupply'}
                                    />

                                    <FormItemCheckbox
                                        label={'Buy to resupply'}
                                        name={'buy_to_resupply'}
                                    />
                                </ColForm>
                            </RowForm>
                        </TabPane>

                        {
                            id &&
                            <TabPane tab="Technical Information" key="2">
                                <RowForm>
                                    <ColForm>
                                        <Divider orientation={'left'}>
                                            Locations
                                        </Divider>
                                        <FormItemSelectTest
                                            label={'View Location'}
                                            name={'view_location_id'}
                                            message={'Please select a view location'}
                                            required={true}
                                            {...viewLocationOptions}
                                        />

                                        <FormItemSelectTest
                                            label={'Stock Location'}
                                            name={'stock_location_id'}
                                            message={'Please select a stock location'}
                                            required={true}
                                            {...stockLocationOptions}
                                        />

                                        <FormItemSelectTest
                                            label={'Input Location'}
                                            name={'input_location_id'}
                                            message={'Please select a input location'}
                                            required={true}
                                            {...inputLocationOptions}
                                        />

                                        <FormItemSelectTest
                                            label={'Quality Control Location'}
                                            name={'quality_control_location_id'}
                                            message={'Please select a quality control location'}
                                            required={true}
                                            {...qualityControlLocationOptions}
                                        />

                                        <FormItemSelectTest
                                            label={'Packing Location'}
                                            name={'packing_location_id'}
                                            message={'Please select a packing location'}
                                            required={true}
                                            {...packingLocationOptions}
                                        />

                                        <FormItemSelectTest
                                            label={'Output Location'}
                                            name={'output_location_id'}
                                            message={'Please select a output location'}
                                            required={true}
                                            {...outputLocationOptions}
                                        />

                                        <FormItemSelectTest
                                            label={'Stock after manufacturing location'}
                                            name={'stock_after_manufacturing_location_id'}
                                            message={'Please select a stock after manufacturing location'}
                                            required={true}
                                            {...stockAfterManufacturingLocationOptions}
                                        />

                                        <FormItemSelectTest
                                            label={'Picking before manufacturing location'}
                                            name={'picking_before_manufacturing_location_id'}
                                            message={'Please select a picking before manufacturing location'}
                                            required={true}
                                            {...pickingBeforeManufacturingLocationOptions}
                                        />
                                    </ColForm>

                                    <ColForm>
                                        <Divider orientation={'left'}>
                                            Operation Types
                                        </Divider>

                                        <FormItemSelectTest
                                            label={'In Type'}
                                            name={'in_type_id'}
                                            message={'Please select a in operation type'}
                                            required={true}
                                            {...inTypeOptions}
                                        />
                                        <FormItemSelectTest
                                            label={'Internal Type'}
                                            name={'internal_type_id'}
                                            message={'Please select a internal operation type'}
                                            required={true}
                                            {...internalTypeOptions}
                                        />
                                        <FormItemSelectTest
                                            label={'Pick Type'}
                                            name={'pick_type_id'}
                                            message={'Please select a pick operation type'}
                                            required={true}
                                            {...pickTypeOptions}
                                        />
                                        <FormItemSelectTest
                                            label={'Pack Type'}
                                            name={'pack_type_id'}
                                            message={'Please select a pack operation type'}
                                            required={true}
                                            {...packTypeOptions}
                                        />
                                        <FormItemSelectTest
                                            label={'Out Type'}
                                            name={'out_type_id'}
                                            message={'Please select a out operation type'}
                                            required={true}
                                            {...outTypeOptions}
                                        />
                                        <FormItemSelectTest
                                            label={'Stock After Manufacturing Operation Type'}
                                            name={'stock_after_manufacturing_operation_type_id'}
                                            message={'Please select a stock after manufacturing operation type'}
                                            required={true}
                                            {...stockAfterManufacturingOperationTypeOptions}
                                        />
                                        <FormItemSelectTest
                                            label={'Picking Before Manufacturing Operation Type'}
                                            name={'picking_before_manufacturing_operation_type_id'}
                                            message={'Please select a picking before manufacturing operation type'}
                                            required={true}
                                            {...pickingBeforeManufacturingOperationTypeOptions}
                                        />
                                        <FormItemSelectTest
                                            label={'Manufacturing Operation Type'}
                                            name={'manufacturing_operation_type_id'}
                                            message={'Please select a manufacturing operation type'}
                                            required={true}
                                            {...manufacturingOperationTypeOperationTypeOptions}
                                        />
                                    </ColForm>
                                </RowForm>
                            </TabPane>
                        }
                    </Tabs>


                </FormCard>
            </CustomForm>
        </FormContextProvider>
    );
};

export default WarehouseForm;
