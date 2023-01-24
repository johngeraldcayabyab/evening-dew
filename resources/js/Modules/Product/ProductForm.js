import React, {useEffect} from 'react';
import {Form, Tabs} from "antd";
import {useParams} from "react-router-dom";
import useFormHook from "../../Hooks/useFormHook";
import manifest from "./product_manifest.json";
import FormButtons from "../../Components/FormButtons/FormButtons";
import RowForm from "../../Components/Grid/RowForm";
import ColForm from "../../Components/Grid/ColForm";
import CustomForm from "../../Components/CustomForm";
import ControlPanel from "../../Components/ControlPanel";
import FormCard from "../../Components/FormCard";
import FormItemText from "../../Components/FormItem/FormItemText";
import FormItemUpload from "../../Components/FormItem/FormItemUpload";
import FormItemNumber from "../../Components/FormItem/FormItemNumber";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {FormContextProvider} from "../../Contexts/FormContext";
import useOptionHook from "../../Hooks/useOptionHook";
import FormItemSelect from "../../Components/FormItem/FormItemSelect";
import NextPreviousRecord from "../../Components/NextPreviousRecord";
import FormLinks from "../../Components/FormLinks";
import FormItemTextArea from "../../Components/FormItem/FormItemTextArea";
import FormItemCheckbox from "../../Components/FormItem/FormItemCheckbox"

const {TabPane} = Tabs;

const ProductForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest, true);
    const measurementOptions = useOptionHook('/api/measurements', 'measurement.name');
    const purchaseMeasurementOptions = useOptionHook('/api/measurements', 'purchase_measurement.name');
    const salesMeasurementOptions = useOptionHook('/api/measurements', 'sales_measurement.name');
    const productCategoryOptions = useOptionHook('/api/product_categories', 'product_category.category');

    useEffect(() => {
        measurementOptions.getInitialOptions(formState);
        purchaseMeasurementOptions.getInitialOptions(formState);
        salesMeasurementOptions.getInitialOptions(formState);
        productCategoryOptions.getInitialOptions(formState);
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
                    <FormLinks
                        links={[
                            {
                                value: 'name',
                                label: `Quantity: ${formState.initialValues.quantity} ${formState.initialValues.measurement ? formState.initialValues.measurement.name : null}`,
                            },
                        ]}
                    />
                    <RowForm>
                        <ColForm>
                            <FormItemText
                                form={form}
                                label={'Name'}
                                name={'name'}
                                message={'Please input name'}
                                required={true}
                                size={'large'}
                                {...formState}
                            />
                        </ColForm>

                        <ColForm>
                            <FormItemUpload
                                form={form}
                                name={'avatar'}
                                {...formState}
                            />
                        </ColForm>
                    </RowForm>

                    <RowForm>
                        <ColForm>
                            <FormItemCheckbox
                                label={'Can be sold'}
                                name={'can_be_sold'}
                            />
                            <FormItemCheckbox
                                label={'Can be purchased'}
                                name={'can_be_purchased'}
                            />
                        </ColForm>
                    </RowForm>


                    <Tabs defaultActiveKey="1">
                        <TabPane tab="General Information" key="1">
                            <RowForm>
                                <ColForm>
                                    <FormItemSelect
                                        label={'Product Type'}
                                        name={'product_type'}
                                        message={'Please select a product type'}
                                        required={true}
                                        options={[
                                            {value: 'storable', label: 'Storable'},
                                            {value: 'consumable', label: 'Consumable'},
                                            {value: 'service', label: 'Service'},
                                        ]}
                                    />

                                    <FormItemSelect
                                        label={'Invoicing Policy'}
                                        name={'invoicing_policy'}
                                        message={'Please select an invoicing policy'}
                                        required={true}
                                        options={[
                                            {value: 'ordered_quantities', label: 'Ordered Quantities'},
                                            {value: 'delivered_quantities', label: 'Delivered Quantities'},
                                        ]}
                                    />

                                    <FormItemSelect
                                        label={'Measurement'}
                                        name={'measurement_id'}
                                        message={'Please select a measurement'}
                                        required={true}
                                        {...measurementOptions}
                                    />

                                    <FormItemSelect
                                        label={'Purchase Measurement'}
                                        name={'purchase_measurement_id'}
                                        message={'Please select a purchase measurement'}
                                        required={true}
                                        {...purchaseMeasurementOptions}
                                    />

                                    <FormItemSelect
                                        label={'Sales Measurement'}
                                        name={'sales_measurement_id'}
                                        message={'Please select a sales measurement'}
                                        required={true}
                                        {...salesMeasurementOptions}
                                    />

                                </ColForm>

                                <ColForm>
                                    <FormItemNumber
                                        label={'Sales Price'}
                                        name={'sales_price'}
                                        message={'Please input sales price'}
                                        required={true}
                                    />

                                    <FormItemNumber
                                        label={'Cost'}
                                        name={'cost'}
                                        message={'Please input cost'}
                                        required={true}
                                    />

                                    <FormItemSelect
                                        label={'Product Category'}
                                        name={'product_category_id'}
                                        message={'Please select a product category'}
                                        required={true}
                                        {...productCategoryOptions}
                                    />

                                    <FormItemText
                                        label={'Internal Reference'}
                                        name={'internal_reference'}
                                    />
                                </ColForm>
                            </RowForm>
                        </TabPane>

                        <TabPane tab="Other Information" key="2">
                            <RowForm>
                                <ColForm>
                                    <FormItemTextArea
                                        label={'Sales Description'}
                                        name={'sales_description'}
                                    />

                                    <FormItemTextArea
                                        label={'Purchase Description'}
                                        name={'purchase_description'}
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

export default ProductForm;
