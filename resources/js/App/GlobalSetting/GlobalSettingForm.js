import React from 'react';
import {Divider, Form, Tabs} from "antd";
import {useParams} from "react-router-dom";
import useFormState from "../../Hooks/useFormState";
import manifest from "./__manifest__.json";
import FormButtons from "../../Components/FormButtons/FormButtons";
import RowForm from "../../Components/Grid/RowForm";
import ColForm from "../../Components/Grid/ColForm";
import CustomForm from "../../Components/CustomForm";
import ControlPanel from "../../Components/ControlPanel";
import FormCard from "../../Components/FormCard";
import FormItemSelectAjax from "../../Components/FormItem/FormItemSelectAjax";
import {GenerateDynamicColumns} from "../../Helpers/form";
import FormItemCheckbox from "../../Components/FormItem/FormItemCheckbox";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";

const {TabPane} = Tabs;

const GlobalSettingForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormState(id, form, manifest, true);

    return (
        <CustomForm
            form={form}
            onFinish={formActions.onFinish}
        >
            <ControlPanel
                topColOneLeft={<CustomBreadcrumb reload={formState.initialLoad}/>}
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
                <Tabs defaultActiveKey="1">
                    <TabPane tab="General" key="1">
                        <RowForm>
                            <ColForm>
                                <FormItemSelectAjax
                                    form={form}
                                    label={'Default Country'}
                                    name={'general_default_country_id'}
                                    message={'Please select a default country'}
                                    required={true}
                                    url={'/api/countries/option'}
                                    {...formState}
                                    query={'general_default_country.country_name'}
                                />
                            </ColForm>
                        </RowForm>
                    </TabPane>
                    <TabPane tab="Inventory" key="2">
                        <RowForm>
                            <ColForm>
                                <Divider orientation={'left'}>
                                    Measurements
                                </Divider>
                                <FormItemSelectAjax
                                    form={form}
                                    label={'Default Measurement Category'}
                                    name={'inventory_default_measurement_category_id'}
                                    message={'Please select a default measurement category'}
                                    required={true}
                                    url={'/api/measurement_categories/option'}
                                    {...formState}
                                    query={'inventory_default_measurement_category.name'}
                                />

                                <FormItemSelectAjax
                                    form={form}
                                    label={'Default Measurement'}
                                    name={'inventory_default_measurement_id'}
                                    message={'Please select a default measurement'}
                                    required={true}
                                    url={'/api/measurements/option'}
                                    {...formState}
                                    query={'inventory_default_measurement.name'}
                                />

                                <FormItemSelectAjax
                                    form={form}
                                    label={'Default Purchase Measurement'}
                                    name={'inventory_default_purchase_measurement_id'}
                                    message={'Please select a default purchase measurement'}
                                    required={true}
                                    url={'/api/measurements/option'}
                                    {...formState}
                                    query={'inventory_default_purchase_measurement.name'}
                                />

                                <FormItemSelectAjax
                                    form={form}
                                    label={'Default Sales Measurement'}
                                    name={'inventory_default_sales_measurement_id'}
                                    message={'Please select a default sales measurement'}
                                    required={true}
                                    url={'/api/measurements/option'}
                                    {...formState}
                                    query={'inventory_default_sales_measurement.name'}
                                />
                            </ColForm>

                            <ColForm>
                                <Divider orientation={'left'}>
                                    Category
                                </Divider>

                                <FormItemSelectAjax
                                    form={form}
                                    label={'Default Product Category'}
                                    name={'inventory_default_product_category_id'}
                                    message={'Please select a default product category'}
                                    required={true}
                                    url={'/api/product_categories/option'}
                                    {...formState}
                                    query={'inventory_default_product_category.category'}
                                />
                            </ColForm>
                        </RowForm>

                        <RowForm>
                            <Divider orientation={'left'}>
                                Locations
                            </Divider>

                            <ColForm>
                                <FormItemSelectAjax
                                    form={form}
                                    label={'Default Customer Location'}
                                    name={'inventory_default_customer_location_id'}
                                    message={'Please select a default customer location'}
                                    required={true}
                                    url={'/api/locations/option'}
                                    {...formState}
                                    query={'inventory_default_customer_location.name'}
                                />

                                <FormItemSelectAjax
                                    form={form}
                                    label={'Default Vendor Location'}
                                    name={'inventory_default_vendor_location_id'}
                                    message={'Please select a default customer location'}
                                    required={true}
                                    url={'/api/locations/option'}
                                    {...formState}
                                    query={'inventory_default_vendor_location.name'}
                                />

                                <FormItemSelectAjax
                                    form={form}
                                    label={'Default Inventory Adjustment Location'}
                                    name={'inventory_default_inventory_adjustment_id'}
                                    message={'Please select a default customer location'}
                                    required={true}
                                    url={'/api/locations/option'}
                                    {...formState}
                                    query={'inventory_default_inventory_adjustment.name'}
                                />
                            </ColForm>

                            <ColForm>
                                <FormItemSelectAjax
                                    form={form}
                                    label={'Default Production Location'}
                                    name={'inventory_default_production_id'}
                                    message={'Please select a default customer location'}
                                    required={true}
                                    url={'/api/locations/option'}
                                    {...formState}
                                    query={'inventory_default_production.name'}
                                />

                                <FormItemSelectAjax
                                    form={form}
                                    label={'Default Scrap Location'}
                                    name={'inventory_default_scrap_id'}
                                    message={'Please select a default customer location'}
                                    required={true}
                                    url={'/api/locations/option'}
                                    {...formState}
                                    query={'inventory_default_scrap.name'}
                                />
                            </ColForm>
                        </RowForm>

                        <RowForm>
                            <Divider orientation={'left'}>
                                Defaults
                            </Divider>
                            <ColForm>
                                <FormItemSelectAjax
                                    form={form}
                                    label={'Default Warehouse'}
                                    name={'inventory_default_warehouse_id'}
                                    url={'/api/warehouses/option'}
                                    {...formState}
                                    query={'inventory_default_warehouse.name'}
                                />
                            </ColForm>

                            <ColForm>
                                <FormItemCheckbox
                                    form={form}
                                    label={'Auto validate drafts'}
                                    name={'inventory_auto_validate_draft'}
                                    {...formState}
                                />
                            </ColForm>
                        </RowForm>
                    </TabPane>

                    <TabPane tab="Accounting" key="3">
                        <RowForm>
                            <ColForm>
                                <FormItemSelectAjax
                                    form={form}
                                    label={'Default Currency'}
                                    name={'accounting_default_currency_id'}
                                    message={'Please select a default currency'}
                                    required={true}
                                    url={'/api/currencies/option'}
                                    {...formState}
                                    query={'accounting_default_currency.currency'}
                                />
                            </ColForm>
                        </RowForm>
                    </TabPane>

                    <TabPane tab="Sales" key="4">
                        <RowForm>
                            <ColForm>
                                <FormItemSelectAjax
                                    form={form}
                                    label={'Sales Default Sequence'}
                                    name={'sales_order_default_sequence_id'}
                                    url={'/api/sequences/option'}
                                    {...formState}
                                    query={'sales_order_default_sequence.name'}
                                />
                            </ColForm>
                        </RowForm>
                    </TabPane>
                </Tabs>
            </FormCard>
        </CustomForm>
    );
};

export default GlobalSettingForm;
