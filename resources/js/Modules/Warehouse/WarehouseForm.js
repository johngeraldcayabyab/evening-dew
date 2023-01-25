import React, {useEffect} from 'react';
import {Divider, Form, Tabs} from "antd";
import {useParams} from "react-router-dom";
import useFormHook from "../../Hooks/useFormHook";
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
import FormItemSelect from "../../Components/FormItem/FormItemSelect";
import {snakeToCamel} from "../../Helpers/string";
import NextPreviousRecord from "../../Components/NextPreviousRecord";
import Warehouse from "./WarehouseManifest"

const {TabPane} = Tabs;

const WarehouseForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, Warehouse, true);
    let urlQueries = [
        {url: '/api/locations', query: 'view_location.name'},
        {url: '/api/locations', query: 'stock_location.name'},
        {url: '/api/locations', query: 'input_location.name'},
        {url: '/api/locations', query: 'quality_control_location.name'},
        {url: '/api/locations', query: 'packing_location.name'},
        {url: '/api/locations', query: 'output_location.name'},
        {url: '/api/locations', query: 'stock_after_manufacturing_location.name'},
        {url: '/api/locations', query: 'picking_before_manufacturing_location.name'},
        {url: '/api/locations', query: 'adjustment_location.name'},
        {url: '/api/operations_types', query: 'in_type.name'},
        {url: '/api/operations_types', query: 'internal_type.name'},
        {url: '/api/operations_types', query: 'pick_type.name'},
        {url: '/api/operations_types', query: 'pack_type.name'},
        {url: '/api/operations_types', query: 'out_type.name'},
        {url: '/api/operations_types', query: 'stock_after_manufacturing_operation_type.name'},
        {url: '/api/operations_types', query: 'picking_before_manufacturing_operation_type.name'},
        {url: '/api/operations_types', query: 'manufacturing_operation_type.name'},
        {url: '/api/operations_types', query: 'adjustment_operation_type.name'},
    ];
    const options = {};
    urlQueries.forEach((urlQuery) => {
        options[snakeToCamel(urlQuery.query.split('.')[0])] = useOptionHook(urlQuery.url, urlQuery.query);
    });
    useEffect(() => {
        for (const option in options) {
            options[option].getInitialOptions(formState);
        }
    }, [formState.initialLoad]);

    return (
        <FormContextProvider
            value={{
                id: id,
                manifest: Warehouse,
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
                                        <FormItemSelect
                                            label={'View Location'}
                                            name={'view_location_id'}
                                            message={'Please select a view location'}
                                            required={true}
                                            {...options.viewLocation}
                                            dropdownRender={options.viewLocation}
                                        />

                                        <FormItemSelect
                                            label={'Stock Location'}
                                            name={'stock_location_id'}
                                            message={'Please select a stock location'}
                                            required={true}
                                            {...options.stockLocation}
                                            dropdownRender={options.stockLocation}
                                        />

                                        <FormItemSelect
                                            label={'Input Location'}
                                            name={'input_location_id'}
                                            message={'Please select a input location'}
                                            required={true}
                                            {...options.inputLocation}
                                            dropdownRender={options.inputLocation}
                                        />

                                        <FormItemSelect
                                            label={'Quality Control Location'}
                                            name={'quality_control_location_id'}
                                            message={'Please select a quality control location'}
                                            required={true}
                                            {...options.qualityControlLocation}
                                            dropdownRender={options.qualityControlLocation}
                                        />

                                        <FormItemSelect
                                            label={'Packing Location'}
                                            name={'packing_location_id'}
                                            message={'Please select a packing location'}
                                            required={true}
                                            {...options.packingLocation}
                                            dropdownRender={options.packingLocation}
                                        />

                                        <FormItemSelect
                                            label={'Output Location'}
                                            name={'output_location_id'}
                                            message={'Please select a output location'}
                                            required={true}
                                            {...options.outputLocation}
                                            dropdownRender={options.outputLocation}
                                        />

                                        <FormItemSelect
                                            label={'Stock after manufacturing location'}
                                            name={'stock_after_manufacturing_location_id'}
                                            message={'Please select a stock after manufacturing location'}
                                            required={true}
                                            {...options.stockAfterManufacturingLocation}
                                            dropdownRender={options.stockAfterManufacturingLocation}
                                        />

                                        <FormItemSelect
                                            label={'Picking before manufacturing location'}
                                            name={'picking_before_manufacturing_location_id'}
                                            message={'Please select a picking before manufacturing location'}
                                            required={true}
                                            {...options.pickingBeforeManufacturingLocation}
                                            dropdownRender={options.pickingBeforeManufacturingLocation}
                                        />

                                        <FormItemSelect
                                            label={'Adjustment Location'}
                                            name={'adjustment_location_id'}
                                            message={'Please select an adjustment location'}
                                            required={true}
                                            {...options.adjustmentLocation}
                                            dropdownRender={options.adjustmentLocation}
                                        />
                                    </ColForm>

                                    <ColForm>
                                        <Divider orientation={'left'}>
                                            Operation Types
                                        </Divider>

                                        <FormItemSelect
                                            label={'In Type'}
                                            name={'in_type_id'}
                                            message={'Please select a in operation type'}
                                            required={true}
                                            {...options.inType}
                                        />
                                        <FormItemSelect
                                            label={'Internal Type'}
                                            name={'internal_type_id'}
                                            message={'Please select a internal operation type'}
                                            required={true}
                                            {...options.internalType}
                                        />
                                        <FormItemSelect
                                            label={'Pick Type'}
                                            name={'pick_type_id'}
                                            message={'Please select a pick operation type'}
                                            required={true}
                                            {...options.pickType}
                                        />
                                        <FormItemSelect
                                            label={'Pack Type'}
                                            name={'pack_type_id'}
                                            message={'Please select a pack operation type'}
                                            required={true}
                                            {...options.packType}
                                        />
                                        <FormItemSelect
                                            label={'Out Type'}
                                            name={'out_type_id'}
                                            message={'Please select a out operation type'}
                                            required={true}
                                            {...options.outType}
                                        />
                                        <FormItemSelect
                                            label={'Stock After Manufacturing Operation Type'}
                                            name={'stock_after_manufacturing_operation_type_id'}
                                            message={'Please select a stock after manufacturing operation type'}
                                            required={true}
                                            {...options.stockAfterManufacturingOperationType}
                                        />
                                        <FormItemSelect
                                            label={'Picking Before Manufacturing Operation Type'}
                                            name={'picking_before_manufacturing_operation_type_id'}
                                            message={'Please select a picking before manufacturing operation type'}
                                            required={true}
                                            {...options.pickingBeforeManufacturingOperationType}
                                        />
                                        <FormItemSelect
                                            label={'Manufacturing Operation Type'}
                                            name={'manufacturing_operation_type_id'}
                                            message={'Please select a manufacturing operation type'}
                                            required={true}
                                            {...options.manufacturingOperationType}
                                        />
                                        <FormItemSelect
                                            label={'Adjustment Operation Type'}
                                            name={'adjustment_operation_type_id'}
                                            message={'Please select an adjustment operation type'}
                                            required={true}
                                            {...options.adjustmentOperationType}
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
