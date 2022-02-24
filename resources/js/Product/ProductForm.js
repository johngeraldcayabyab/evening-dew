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
import FormItemSelectAjaxAdvanced from "../components/FormItem/FormItemSelectAjaxAdvanced";
import FormItemUpload from "../components/FormItem/FormItemUpload";
import FormItemNumber from "../components/FormItem/FormItemNumber";
import FormItemSelect from "../components/FormItem/FormItemSelect";

const {TabPane} = Tabs;

const ProductForm = () => {
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


                <Tabs defaultActiveKey="1">
                    <TabPane tab="General Information" key="1">
                        <RowForm>
                            <ColForm>

                                <FormItemSelect
                                    form={form}
                                    label={'Product Type'}
                                    name={'product_type'}
                                    message={'Please select a product type'}
                                    required={true}
                                    options={[
                                        {value: 'storable', label: 'Storable'},
                                        {value: 'consumable', label: 'Consumable'},
                                        {value: 'service', label: 'Service'},
                                    ]}
                                    {...formState}
                                />

                                <FormItemSelect
                                    form={form}
                                    label={'Invoicing Policy'}
                                    name={'invoicing_policy'}
                                    message={'Please select an invoicing policy'}
                                    required={true}
                                    options={[
                                        {value: 'ordered_quantities', label: 'Ordered Quantities'},
                                        {value: 'delivered_quantities', label: 'Delivered Quantities'},
                                    ]}
                                    {...formState}
                                />

                                <FormItemSelectAjaxAdvanced
                                    label={'Measurement'}
                                    name={'measurement_id'}
                                    message={'Please select a measurement'}
                                    required={true}
                                    url={'/api/measurements/option'}
                                    {...formState}
                                    query={'measurement.name'}
                                />

                                <FormItemSelectAjaxAdvanced
                                    label={'Purchase Measurement'}
                                    name={'purchase_measurement_id'}
                                    message={'Please select a purchase measurement'}
                                    required={true}
                                    url={'/api/measurements/option'}
                                    {...formState}
                                    query={'purchase_measurement.name'}
                                />

                                <FormItemSelectAjaxAdvanced
                                    label={'Sales Measurement'}
                                    name={'sales_measurement_id'}
                                    message={'Please select a sales measurement'}
                                    required={true}
                                    url={'/api/measurements/option'}
                                    {...formState}
                                    query={'sales_measurement.name'}
                                />

                            </ColForm>

                            <ColForm>
                                <FormItemNumber
                                    label={'Sales Price'}
                                    name={'sales_price'}
                                    message={'Please input sales price'}
                                    required={true}
                                    {...formState}
                                />

                                <FormItemNumber
                                    label={'Cost'}
                                    name={'cost'}
                                    message={'Please input cost'}
                                    required={true}
                                    {...formState}
                                />

                                <FormItemSelectAjaxAdvanced
                                    label={'Product Category'}
                                    name={'product_category_id'}
                                    message={'Please select a product category'}
                                    required={true}
                                    url={'/api/product_categories/option'}
                                    {...formState}
                                    query={'product_category.category'}
                                />

                                <FormItemText
                                    label={'Internal Reference'}
                                    name={'internal_reference'}
                                    {...formState}
                                />
                            </ColForm>
                        </RowForm>
                    </TabPane>


                    <TabPane tab="Other Information" key="2">
                        <RowForm>
                            <ColForm>
                                <FormItemText
                                    label={'Sales Description'}
                                    name={'sales_description'}
                                    {...formState}
                                />

                                <FormItemText
                                    label={'Purchase Description'}
                                    name={'purchase_description'}
                                    {...formState}
                                />
                            </ColForm>
                        </RowForm>
                    </TabPane>
                </Tabs>
            </FormCard>
        </CustomForm>
    );
};

export default ProductForm;
