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
import FormItemSelectAjax from "../../Components/FormItem/FormItemSelectAjax";
import FormItemCheckbox from "../../Components/FormItem/FormItemCheckbox";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {FormContextProvider} from "../../Contexts/FormContext";

const {TabPane} = Tabs;

const GlobalSettingForm = () => {
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
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="General" key="1">
                            <RowForm>
                                <ColForm>
                                    <FormItemSelectAjax
                                        label={'Default Country'}
                                        name={'general_default_country_id'}
                                        message={'Please select a default country'}
                                        required={true}
                                        url={'/api/countries'}
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
                                        label={'Default Measurement Category'}
                                        name={'inventory_default_measurement_category_id'}
                                        message={'Please select a default measurement category'}
                                        required={true}
                                        url={'/api/measurement_categories'}
                                        query={'inventory_default_measurement_category.name'}
                                    />

                                    <FormItemSelectAjax
                                        label={'Default Measurement'}
                                        name={'inventory_default_measurement_id'}
                                        message={'Please select a default measurement'}
                                        required={true}
                                        url={'/api/measurements'}
                                        query={'inventory_default_measurement.name'}
                                    />

                                    <FormItemSelectAjax
                                        label={'Default Purchase Measurement'}
                                        name={'inventory_default_purchase_measurement_id'}
                                        message={'Please select a default purchase measurement'}
                                        required={true}
                                        url={'/api/measurements'}
                                        query={'inventory_default_purchase_measurement.name'}
                                    />

                                    <FormItemSelectAjax
                                        label={'Default Sales Measurement'}
                                        name={'inventory_default_sales_measurement_id'}
                                        message={'Please select a default sales measurement'}
                                        required={true}
                                        url={'/api/measurements'}
                                        query={'inventory_default_sales_measurement.name'}
                                    />
                                </ColForm>

                                <ColForm>
                                    <Divider orientation={'left'}>
                                        Category
                                    </Divider>

                                    <FormItemSelectAjax
                                        label={'Default Product Category'}
                                        name={'inventory_default_product_category_id'}
                                        message={'Please select a default product category'}
                                        required={true}
                                        url={'/api/product_categories'}
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
                                        label={'Default Customer Location'}
                                        name={'inventory_default_customer_location_id'}
                                        message={'Please select a default customer location'}
                                        required={true}
                                        url={'/api/locations'}
                                        query={'inventory_default_customer_location.name'}
                                    />

                                    <FormItemSelectAjax
                                        label={'Default Vendor Location'}
                                        name={'inventory_default_vendor_location_id'}
                                        message={'Please select a default customer location'}
                                        required={true}
                                        url={'/api/locations'}
                                        query={'inventory_default_vendor_location.name'}
                                    />

                                    <FormItemSelectAjax
                                        label={'Default Inventory Adjustment Location'}
                                        name={'inventory_default_inventory_adjustment_id'}
                                        message={'Please select a default customer location'}
                                        required={true}
                                        url={'/api/locations'}
                                        query={'inventory_default_inventory_adjustment.name'}
                                    />
                                </ColForm>

                                <ColForm>
                                    <FormItemSelectAjax
                                        label={'Default Production Location'}
                                        name={'inventory_default_production_id'}
                                        message={'Please select a default customer location'}
                                        required={true}
                                        url={'/api/locations'}
                                        query={'inventory_default_production.name'}
                                    />

                                    <FormItemSelectAjax
                                        label={'Default Scrap Location'}
                                        name={'inventory_default_scrap_id'}
                                        message={'Please select a default customer location'}
                                        required={true}
                                        url={'/api/locations'}
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
                                        label={'Default Warehouse'}
                                        name={'inventory_default_warehouse_id'}
                                        url={'/api/warehouses'}
                                        query={'inventory_default_warehouse.name'}
                                    />
                                </ColForm>

                                <ColForm>
                                    <FormItemCheckbox
                                        label={'Auto validate drafts'}
                                        name={'inventory_auto_validate_draft'}
                                    />
                                </ColForm>
                            </RowForm>
                        </TabPane>

                        <TabPane tab="Accounting" key="3">
                            <RowForm>
                                <ColForm>
                                    <FormItemSelectAjax
                                        label={'Default Currency'}
                                        name={'accounting_default_currency_id'}
                                        message={'Please select a default currency'}
                                        required={true}
                                        url={'/api/currencies'}
                                        query={'accounting_default_currency.currency'}
                                    />
                                </ColForm>
                            </RowForm>
                        </TabPane>

                        <TabPane tab="Sales" key="4">
                            <RowForm>
                                <ColForm>
                                    <FormItemSelectAjax
                                        label={'Sales Default Sequence'}
                                        name={'sales_order_default_sequence_id'}
                                        url={'/api/sequences'}
                                        query={'sales_order_default_sequence.name'}
                                    />
                                </ColForm>
                            </RowForm>
                        </TabPane>
                    </Tabs>
                </FormCard>
            </CustomForm>
        </FormContextProvider>
    );
};

export default GlobalSettingForm;
