import React from 'react';
import {Form, Tabs} from "antd";
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
import FormItemUpload from "../../Components/FormItem/FormItemUpload";
import FormItemNumber from "../../Components/FormItem/FormItemNumber";
import FormItemSelect from "../../Components/FormItem/FormItemSelect";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {FormContextProvider} from "../../Contexts/FormContext";

const {TabPane} = Tabs;

const ProductForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest, true);

    return (
        <FormContextProvider value={{form: form, formState: formState, onFinish: formActions.onFinish}}>
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

                                    <FormItemSelectAjax
                                        form={form}
                                        label={'Measurement'}
                                        name={'measurement_id'}
                                        message={'Please select a measurement'}
                                        required={true}
                                        url={'/api/measurements'}
                                        {...formState}
                                        query={'measurement.name'}
                                    />

                                    <FormItemSelectAjax
                                        form={form}
                                        label={'Purchase Measurement'}
                                        name={'purchase_measurement_id'}
                                        message={'Please select a purchase measurement'}
                                        required={true}
                                        url={'/api/measurements'}
                                        {...formState}
                                        query={'purchase_measurement.name'}
                                    />

                                    <FormItemSelectAjax
                                        form={form}
                                        label={'Sales Measurement'}
                                        name={'sales_measurement_id'}
                                        message={'Please select a sales measurement'}
                                        required={true}
                                        url={'/api/measurements'}
                                        {...formState}
                                        query={'sales_measurement.name'}
                                    />

                                </ColForm>

                                <ColForm>
                                    <FormItemNumber
                                        form={form}
                                        label={'Sales Price'}
                                        name={'sales_price'}
                                        message={'Please input sales price'}
                                        required={true}
                                        {...formState}
                                    />

                                    <FormItemNumber
                                        form={form}
                                        label={'Cost'}
                                        name={'cost'}
                                        message={'Please input cost'}
                                        required={true}
                                        {...formState}
                                    />

                                    <FormItemSelectAjax
                                        form={form}
                                        label={'Product Category'}
                                        name={'product_category_id'}
                                        message={'Please select a product category'}
                                        required={true}
                                        url={'/api/product_categories'}
                                        {...formState}
                                        query={'product_category.category'}
                                    />

                                    <FormItemText
                                        form={form}
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
                                        form={form}
                                        label={'Sales Description'}
                                        name={'sales_description'}
                                        {...formState}
                                    />

                                    <FormItemText
                                        form={form}
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
        </FormContextProvider>
    );
};

export default ProductForm;
