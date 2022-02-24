import React from 'react';
import {Divider, Form} from "antd";
import {useParams} from "react-router-dom";
import useFormState from "../Hooks/useFormState";
import manifest from "./__manifest__.json";
import FormButtons from "../components/FormButtons/FormButtons";
import RowForm from "../components/Grid/RowForm";
import ColForm from "../components/Grid/ColForm";
import CustomForm from "../components/CustomForm";
import ControlPanel from "../components/ControlPanel";
import FormCard from "../components/FormCard";
import FormItemSelectAjaxAdvanced from "../components/FormItem/FormItemSelectAjaxAdvanced";

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
                <Divider orientation={'left'}>
                    General
                </Divider>
                <RowForm>
                    <ColForm>
                        <FormItemSelectAjaxAdvanced
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


                <Divider orientation={'left'}>
                    Inventory
                </Divider>
                <RowForm>
                    <ColForm>
                        <FormItemSelectAjaxAdvanced
                            label={'Default Measurement Category'}
                            name={'inventory_default_measurement_category_id'}
                            message={'Please select a default measurement category'}
                            required={true}
                            url={'/api/measurement_categories/option'}
                            {...formState}
                            query={'inventory_default_measurement_category.name'}
                        />

                        <FormItemSelectAjaxAdvanced
                            label={'Default Measurement'}
                            name={'inventory_default_measurement_id'}
                            message={'Please select a default measurement'}
                            required={true}
                            url={'/api/measurements/option'}
                            {...formState}
                            query={'inventory_default_measurement.name'}
                        />

                        <FormItemSelectAjaxAdvanced
                            label={'Default Purchase Measurement'}
                            name={'inventory_default_purchase_measurement_id'}
                            message={'Please select a default purchase measurement'}
                            required={true}
                            url={'/api/measurements/option'}
                            {...formState}
                            query={'inventory_default_purchase_measurement.name'}
                        />

                        <FormItemSelectAjaxAdvanced
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
                        <FormItemSelectAjaxAdvanced
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

                <Divider orientation={'left'}>
                    Accounting
                </Divider>
                <RowForm>
                    <ColForm>
                        <FormItemSelectAjaxAdvanced
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

                <Divider orientation={'left'}>
                    Sales
                </Divider>
                <RowForm>
                    <ColForm>
                        <FormItemSelectAjaxAdvanced
                            label={'Sales Default Sequence'}
                            name={'sales_order_default_sequence_id'}
                            url={'/api/sequences/option'}
                            {...formState}
                            query={'sales_order_default_sequence.name'}
                        />
                    </ColForm>
                </RowForm>
            </FormCard>
        </CustomForm>
    );
};

export default GlobalSettingForm;
