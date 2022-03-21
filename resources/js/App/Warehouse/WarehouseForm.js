import React from 'react';
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
import FormItemSelectAjax from "../../Components/FormItem/FormItemSelectAjax";
import FormItemCheckbox from "../../Components/FormItem/FormItemCheckbox";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {FormContextProvider} from "../../Contexts/FormContext";

const {TabPane} = Tabs;

const WarehouseForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest, true);

    return (
        <FormContextProvider
            value={{
                form: form,
                formState: formState,
                onFinish: formActions.onFinish
            }}
        >
            <CustomForm>
                <ControlPanel
                    topColOneLeft={<CustomBreadcrumb/>}
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

                            <FormItemText
                                form={form}
                                label={'Short Name'}
                                name={'short_name'}
                                message={'Please input short_name'}
                                required={true}
                                size={'medium'}
                                {...formState}
                            />
                        </ColForm>
                    </RowForm>

                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Warehouse Configuration" key="1">
                            <RowForm>
                                <ColForm>
                                    <FormItemCheckbox
                                        form={form}
                                        label={'Manufacture to resupply'}
                                        name={'manufacture_to_resupply'}
                                        {...formState}
                                    />

                                    <FormItemCheckbox
                                        form={form}
                                        label={'Buy to resupply'}
                                        name={'buy_to_resupply'}
                                        {...formState}
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
                                        <FormItemSelectAjax
                                            form={form}
                                            label={'View Location'}
                                            name={'view_location_id'}
                                            message={'Please select a view location'}
                                            required={true}
                                            url={'/api/locations'}
                                            {...formState}
                                            query={'view_location.name'}
                                        />

                                        <FormItemSelectAjax
                                            form={form}
                                            label={'Stock Location'}
                                            name={'stock_location_id'}
                                            message={'Please select a stock location'}
                                            required={true}
                                            url={'/api/locations'}
                                            {...formState}
                                            query={'stock_location.name'}
                                        />

                                        <FormItemSelectAjax
                                            form={form}
                                            label={'Input Location'}
                                            name={'input_location_id'}
                                            message={'Please select a input location'}
                                            required={true}
                                            url={'/api/locations'}
                                            {...formState}
                                            query={'input_location.name'}
                                        />

                                        <FormItemSelectAjax
                                            form={form}
                                            label={'Quality Control Location'}
                                            name={'quality_control_location_id'}
                                            message={'Please select a quality control location'}
                                            required={true}
                                            url={'/api/locations'}
                                            {...formState}
                                            query={'quality_control_location.name'}
                                        />

                                        <FormItemSelectAjax
                                            form={form}
                                            label={'Packing Location'}
                                            name={'packing_location_id'}
                                            message={'Please select a packing location'}
                                            required={true}
                                            url={'/api/locations'}
                                            {...formState}
                                            query={'packing_location.name'}
                                        />

                                        <FormItemSelectAjax
                                            form={form}
                                            label={'Output Location'}
                                            name={'output_location_id'}
                                            message={'Please select a output location'}
                                            required={true}
                                            url={'/api/locations'}
                                            {...formState}
                                            query={'output_location.name'}
                                        />

                                        <FormItemSelectAjax
                                            form={form}
                                            label={'Stock after manufacturing location'}
                                            name={'stock_after_manufacturing_location_id'}
                                            message={'Please select a stock after manufacturing location'}
                                            required={true}
                                            url={'/api/locations'}
                                            {...formState}
                                            query={'stock_after_manufacturing_location.name'}
                                        />

                                        <FormItemSelectAjax
                                            form={form}
                                            label={'Picking before manufacturing location'}
                                            name={'picking_before_manufacturing_location_id'}
                                            message={'Please select a picking before manufacturing location'}
                                            required={true}
                                            url={'/api/locations'}
                                            {...formState}
                                            query={'picking_before_manufacturing_location.name'}
                                        />
                                    </ColForm>

                                    <ColForm>
                                        <Divider orientation={'left'}>
                                            Operation Types
                                        </Divider>

                                        <FormItemSelectAjax
                                            form={form}
                                            label={'In Type'}
                                            name={'in_type_id'}
                                            message={'Please select a in operation type'}
                                            required={true}
                                            url={'/api/operations_types'}
                                            {...formState}
                                            query={'in_type.name'}
                                        />
                                        <FormItemSelectAjax
                                            form={form}
                                            label={'Internal Type'}
                                            name={'internal_type_id'}
                                            message={'Please select a internal operation type'}
                                            required={true}
                                            url={'/api/operations_types'}
                                            {...formState}
                                            query={'internal_type.name'}
                                        />
                                        <FormItemSelectAjax
                                            form={form}
                                            label={'Pick Type'}
                                            name={'pick_type_id'}
                                            message={'Please select a pick operation type'}
                                            required={true}
                                            url={'/api/operations_types'}
                                            {...formState}
                                            query={'pick_type.name'}
                                        />
                                        <FormItemSelectAjax
                                            form={form}
                                            label={'Pack Type'}
                                            name={'pack_type_id'}
                                            message={'Please select a pack operation type'}
                                            required={true}
                                            url={'/api/operations_types'}
                                            {...formState}
                                            query={'pack_type.name'}
                                        />
                                        <FormItemSelectAjax
                                            form={form}
                                            label={'Out Type'}
                                            name={'out_type_id'}
                                            message={'Please select a out operation type'}
                                            required={true}
                                            url={'/api/operations_types'}
                                            {...formState}
                                            query={'out_type.name'}
                                        />
                                        <FormItemSelectAjax
                                            form={form}
                                            label={'Stock After Manufacturing Operation Type'}
                                            name={'stock_after_manufacturing_operation_type_id'}
                                            message={'Please select a stock after manufacturing operation type'}
                                            required={true}
                                            url={'/api/operations_types'}
                                            {...formState}
                                            query={'stock_after_manufacturing_operation_type.name'}
                                        />
                                        <FormItemSelectAjax
                                            form={form}
                                            label={'Picking Before Manufacturing Operation Type'}
                                            name={'picking_before_manufacturing_operation_type_id'}
                                            message={'Please select a picking before manufacturing operation type'}
                                            required={true}
                                            url={'/api/operations_types'}
                                            {...formState}
                                            query={'picking_before_manufacturing_operation_type.name'}
                                        />
                                        <FormItemSelectAjax
                                            form={form}
                                            label={'Manufacturing Operation Type'}
                                            name={'manufacturing_operation_type_id'}
                                            message={'Please select a manufacturing operation type'}
                                            required={true}
                                            url={'/api/operations_types'}
                                            {...formState}
                                            query={'manufacturing_operation_type.name'}
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
