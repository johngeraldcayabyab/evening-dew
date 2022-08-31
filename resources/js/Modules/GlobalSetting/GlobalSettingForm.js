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
import FormItemCheckbox from "../../Components/FormItem/FormItemCheckbox";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {FormContextProvider} from "../../Contexts/FormContext";
import useOptionHook from "../../Hooks/useOptionHook";
import FormItemSelect from "../../Components/FormItem/FormItemSelect";

const {TabPane} = Tabs;

const GlobalSettingForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest, true);
    const generalDefaultCountryOptions = useOptionHook('/api/countries', 'general_default_country.country_name');
    const inventoryDefaultMeasurementCategoryOptions = useOptionHook('/api/measurement_categories', 'inventory_default_measurement_category.name');
    const inventoryDefaultMeasurementOptions = useOptionHook('/api/measurements', 'inventory_default_measurement.name');
    const inventoryDefaultPurchaseMeasurementOptions = useOptionHook('/api/measurements', 'inventory_default_purchase_measurement.name');
    const inventoryDefaultSalesMeasurementOptions = useOptionHook('/api/measurements', 'inventory_default_sales_measurement.name');
    const inventoryDefaultProductCategoryOptions = useOptionHook('/api/product_categories', 'inventory_default_product_category.category');
    const inventoryDefaultCustomerLocationOptions = useOptionHook('/api/locations', 'inventory_default_customer_location.name');
    const inventoryDefaultVendorLocationOptions = useOptionHook('/api/locations', 'inventory_default_vendor_location.name');
    const inventoryDefaultInventoryAdjustmentOptions = useOptionHook('/api/locations', 'inventory_default_inventory_adjustment.name');
    const inventoryDefaultProductionOptions = useOptionHook('/api/locations', 'inventory_default_production.name');
    const inventoryDefaultScrapOptions = useOptionHook('/api/locations', 'inventory_default_scrap.name');
    const inventoryDefaultWarehouseOptions = useOptionHook('/api/warehouses', 'inventory_default_warehouse.name');
    const accountingDefaultCurrencyOptions = useOptionHook('/api/currencies', 'accounting_default_currency.currency');
    const salesOrderDefaultSequenceOptions = useOptionHook('/api/sequences', 'sales_order_default_sequence.name');
    const salesOrderDefaultDeliveryFeeOptions = useOptionHook('/api/delivery_fees', 'sales_order_default_delivery_fee.name');

    useEffect(() => {
        generalDefaultCountryOptions.getInitialOptions(formState);
        inventoryDefaultMeasurementCategoryOptions.getInitialOptions(formState);
        inventoryDefaultMeasurementOptions.getInitialOptions(formState);
        inventoryDefaultPurchaseMeasurementOptions.getInitialOptions(formState);
        inventoryDefaultSalesMeasurementOptions.getInitialOptions(formState);
        inventoryDefaultProductCategoryOptions.getInitialOptions(formState);
        inventoryDefaultCustomerLocationOptions.getInitialOptions(formState);
        inventoryDefaultVendorLocationOptions.getInitialOptions(formState);
        inventoryDefaultInventoryAdjustmentOptions.getInitialOptions(formState);
        inventoryDefaultProductionOptions.getInitialOptions(formState);
        inventoryDefaultScrapOptions.getInitialOptions(formState);
        inventoryDefaultWarehouseOptions.getInitialOptions(formState);
        accountingDefaultCurrencyOptions.getInitialOptions(formState);
        salesOrderDefaultSequenceOptions.getInitialOptions(formState);
        salesOrderDefaultDeliveryFeeOptions.getInitialOptions(formState);
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
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="General" key="1">
                            <RowForm>
                                <ColForm>
                                    <FormItemSelect
                                        label={'Default Country'}
                                        name={'general_default_country_id'}
                                        message={'Please select a default country'}
                                        required={true}
                                        {...generalDefaultCountryOptions}
                                    />
                                </ColForm>
                            </RowForm>

                            <RowForm>
                                <ColForm>
                                    <Divider orientation={'left'}>
                                        Table
                                    </Divider>
                                    <FormItemCheckbox
                                        label={'Clickable Row'}
                                        name={'general_clickable_row'}
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
                                    <FormItemSelect
                                        label={'Default Measurement Category'}
                                        name={'inventory_default_measurement_category_id'}
                                        message={'Please select a default measurement category'}
                                        required={true}
                                        {...inventoryDefaultMeasurementCategoryOptions}
                                    />

                                    <FormItemSelect
                                        label={'Default Measurement'}
                                        name={'inventory_default_measurement_id'}
                                        message={'Please select a default measurement'}
                                        required={true}
                                        {...inventoryDefaultMeasurementOptions}
                                    />

                                    <FormItemSelect
                                        label={'Default Purchase Measurement'}
                                        name={'inventory_default_purchase_measurement_id'}
                                        message={'Please select a default purchase measurement'}
                                        required={true}
                                        {...inventoryDefaultPurchaseMeasurementOptions}
                                    />

                                    <FormItemSelect
                                        label={'Default Sales Measurement'}
                                        name={'inventory_default_sales_measurement_id'}
                                        message={'Please select a default sales measurement'}
                                        required={true}
                                        {...inventoryDefaultSalesMeasurementOptions}
                                    />
                                </ColForm>

                                <ColForm>
                                    <Divider orientation={'left'}>
                                        Category
                                    </Divider>

                                    <FormItemSelect
                                        label={'Default Product Category'}
                                        name={'inventory_default_product_category_id'}
                                        message={'Please select a default product category'}
                                        required={true}
                                        {...inventoryDefaultProductCategoryOptions}
                                    />
                                </ColForm>
                            </RowForm>

                            <RowForm>
                                <Divider orientation={'left'}>
                                    Locations
                                </Divider>

                                <ColForm>
                                    <FormItemSelect
                                        label={'Default Customer Location'}
                                        name={'inventory_default_customer_location_id'}
                                        message={'Please select a default customer location'}
                                        required={true}
                                        {...inventoryDefaultCustomerLocationOptions}
                                    />

                                    <FormItemSelect
                                        label={'Default Vendor Location'}
                                        name={'inventory_default_vendor_location_id'}
                                        message={'Please select a default customer location'}
                                        required={true}
                                        {...inventoryDefaultVendorLocationOptions}
                                    />

                                    <FormItemSelect
                                        label={'Default Inventory Adjustment Location'}
                                        name={'inventory_default_inventory_adjustment_id'}
                                        message={'Please select a default customer location'}
                                        required={true}
                                        {...inventoryDefaultInventoryAdjustmentOptions}
                                    />
                                </ColForm>

                                <ColForm>
                                    <FormItemSelect
                                        label={'Default Production Location'}
                                        name={'inventory_default_production_id'}
                                        message={'Please select a default customer location'}
                                        required={true}
                                        {...inventoryDefaultProductionOptions}
                                    />

                                    <FormItemSelect
                                        label={'Default Scrap Location'}
                                        name={'inventory_default_scrap_id'}
                                        message={'Please select a default customer location'}
                                        required={true}
                                        {...inventoryDefaultScrapOptions}
                                    />
                                </ColForm>
                            </RowForm>

                            <RowForm>
                                <Divider orientation={'left'}>
                                    Defaults
                                </Divider>
                                <ColForm>
                                    <FormItemSelect
                                        label={'Default Warehouse'}
                                        name={'inventory_default_warehouse_id'}
                                        {...inventoryDefaultWarehouseOptions}
                                    />
                                </ColForm>
                            </RowForm>


                            <RowForm>
                                <Divider orientation={'left'}>
                                    Background
                                </Divider>
                                <ColForm>
                                    <FormItemCheckbox
                                        label={'Auto validate drafts'}
                                        name={'inventory_auto_validate_draft'}
                                    />

                                    <FormItemCheckbox
                                        label={'Compute Product Quantity'}
                                        name={'inventory_compute_product_quantity'}
                                    />
                                </ColForm>
                            </RowForm>

                        </TabPane>

                        <TabPane tab="Accounting" key="3">
                            <RowForm>
                                <ColForm>
                                    <FormItemSelect
                                        label={'Default Currency'}
                                        name={'accounting_default_currency_id'}
                                        message={'Please select a default currency'}
                                        required={true}
                                        {...accountingDefaultCurrencyOptions}
                                    />
                                </ColForm>
                            </RowForm>
                        </TabPane>

                        <TabPane tab="Sales" key="4">
                            <RowForm>
                                <ColForm>
                                    <FormItemSelect
                                        label={'Sales Default Sequence'}
                                        name={'sales_order_default_sequence_id'}
                                        {...salesOrderDefaultSequenceOptions}
                                    />
                                </ColForm>
                                <ColForm>
                                    <FormItemSelect
                                        label={'Sales Default Delivery Fee'}
                                        name={'sales_order_default_delivery_fee_id'}
                                        {...salesOrderDefaultDeliveryFeeOptions}
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
