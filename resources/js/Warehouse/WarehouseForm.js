import React from 'react';
import {Form, Tabs} from "antd";
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
import FormItemCheckbox from "../components/FormItem/FormItemCheckbox";

const {TabPane} = Tabs;

const WarehouseForm = () => {
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
                            label={'Name'}
                            name={'name'}
                            message={'Please input name'}
                            required={true}
                            size={'large'}
                            {...formState}
                        />

                        <FormItemText
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
                                    label={'Manufacture to resupply'}
                                    name={'manufacture_to_resupply'}
                                    {...formState}
                                />

                                <FormItemCheckbox
                                    label={'Buy to resupply'}
                                    name={'buy_to_resupply'}
                                    {...formState}
                                />
                            </ColForm>
                        </RowForm>
                    </TabPane>


                    <TabPane tab="Technical Information" key="2">
                        <RowForm>
                            <ColForm>
                                <FormItemSelectAjax
                                    label={'View Location'}
                                    name={'view_location_id'}
                                    url={'/api/locations/option'}
                                    {...formState}
                                    query={'view_location.name'}
                                />

                                {/*<FormItemSelectAjax*/}
                                {/*    label={'Stock Location'}*/}
                                {/*    name={'stock_location_id'}*/}
                                {/*    url={'/api/locations/option'}*/}
                                {/*    {...formState}*/}
                                {/*    query={'stock_location.name'}*/}
                                {/*/>*/}

                                {/*<FormItemSelectAjax*/}
                                {/*    label={'Input Location'}*/}
                                {/*    name={'input_location_id'}*/}
                                {/*    url={'/api/locations/option'}*/}
                                {/*    {...formState}*/}
                                {/*    query={'input_location.name'}*/}
                                {/*/>*/}

                                {/*<FormItemSelectAjax*/}
                                {/*    label={'Quality Control Location'}*/}
                                {/*    name={'quality_control_location_id'}*/}
                                {/*    url={'/api/locations/option'}*/}
                                {/*    {...formState}*/}
                                {/*    query={'quality_control_location.name'}*/}
                                {/*/>*/}

                                {/*<FormItemSelectAjax*/}
                                {/*    label={'Packing Location'}*/}
                                {/*    name={'packing_location_id'}*/}
                                {/*    url={'/api/locations/option'}*/}
                                {/*    {...formState}*/}
                                {/*    query={'packing_location.name'}*/}
                                {/*/>*/}

                                {/*<FormItemSelectAjax*/}
                                {/*    label={'Output Location'}*/}
                                {/*    name={'output_location_id'}*/}
                                {/*    url={'/api/locations/option'}*/}
                                {/*    {...formState}*/}
                                {/*    query={'output_location.name'}*/}
                                {/*/>*/}

                                {/*<FormItemSelectAjax*/}
                                {/*    label={'Stock after manufacturing location'}*/}
                                {/*    name={'stock_after_manufacturing_location_id'}*/}
                                {/*    url={'/api/locations/option'}*/}
                                {/*    {...formState}*/}
                                {/*    query={'stock_after_manufacturing_location.name'}*/}
                                {/*/>*/}

                                {/*<FormItemSelectAjax*/}
                                {/*    label={'Picking before manufacturing location'}*/}
                                {/*    name={'picking_before_manufacturing_location_id'}*/}
                                {/*    url={'/api/locations/option'}*/}
                                {/*    {...formState}*/}
                                {/*    query={'picking_before_manufacturing_location.name'}*/}
                                {/*/>*/}
                            </ColForm>

                            <ColForm>
                                {/*<FormItemSelectAjax*/}
                                {/*    label={'In Type'}*/}
                                {/*    name={'in_type_id'}*/}
                                {/*    url={'/api/operations_types/option'}*/}
                                {/*    {...formState}*/}
                                {/*    query={'in_type.name'}*/}
                                {/*/>*/}
                                {/*<FormItemSelectAjax*/}
                                {/*    label={'Internal Type'}*/}
                                {/*    name={'internal_type_id'}*/}
                                {/*    url={'/api/operations_types/option'}*/}
                                {/*    {...formState}*/}
                                {/*    query={'internal_type.name'}*/}
                                {/*/>*/}
                                {/*<FormItemSelectAjax*/}
                                {/*    label={'Picky Type'}*/}
                                {/*    name={'pick_type_id'}*/}
                                {/*    url={'/api/operations_types/option'}*/}
                                {/*    {...formState}*/}
                                {/*    query={'pick_type.name'}*/}
                                {/*/>*/}
                                {/*<FormItemSelectAjax*/}
                                {/*    label={'Pack Type'}*/}
                                {/*    name={'pack_type_id'}*/}
                                {/*    url={'/api/operations_types/option'}*/}
                                {/*    {...formState}*/}
                                {/*    query={'pack_type.name'}*/}
                                {/*/>*/}
                                {/*<FormItemSelectAjax*/}
                                {/*    label={'Out Type'}*/}
                                {/*    name={'out_type_id'}*/}
                                {/*    url={'/api/operations_types/option'}*/}
                                {/*    {...formState}*/}
                                {/*    query={'out_type.name'}*/}
                                {/*/>*/}
                                {/*<FormItemSelectAjax*/}
                                {/*    label={'Stock After Manufacturing Operation Type'}*/}
                                {/*    name={'stock_after_manufacturing_operation_type_id'}*/}
                                {/*    url={'/api/operations_types/option'}*/}
                                {/*    {...formState}*/}
                                {/*    query={'stock_after_manufacturing_operation_type.name'}*/}
                                {/*/>*/}
                                {/*<FormItemSelectAjax*/}
                                {/*    label={'Picking Before Manufacturing Operation Type'}*/}
                                {/*    name={'picking_before_manufacturing_operation_type_id'}*/}
                                {/*    url={'/api/operations_types/option'}*/}
                                {/*    {...formState}*/}
                                {/*    query={'picking_before_manufacturing_operation_type.name'}*/}
                                {/*/>*/}
                                {/*<FormItemSelectAjax*/}
                                {/*    label={'Manufacturing Operation Type'}*/}
                                {/*    name={'manufacturing_operation_type_id'}*/}
                                {/*    url={'/api/operations_types/option'}*/}
                                {/*    {...formState}*/}
                                {/*    query={'manufacturing_operation_type.name'}*/}
                                {/*/>*/}
                            </ColForm>
                        </RowForm>
                    </TabPane>
                </Tabs>


            </FormCard>
        </CustomForm>
    );
};

export default WarehouseForm;
