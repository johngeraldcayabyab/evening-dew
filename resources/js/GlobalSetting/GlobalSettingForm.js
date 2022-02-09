import React, {useContext, useEffect, useState} from 'react';
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
import FormItemSelectAjax from "../components/FormItem/FormItemSelectAjax";

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
                    Inventory
                </Divider>
                <RowForm>
                    <ColForm>
                        <FormItemSelectAjax
                            label={'Default Measurement Category'}
                            name={'inventory_default_measurement_category_id'}
                            url={'/api/measurement_categories/option'}
                            {...formState}
                        />

                        <FormItemSelectAjax
                            label={'Default Measurement'}
                            name={'inventory_default_measurement_id'}
                            url={'/api/measurements/option'}
                            {...formState}
                        />

                        <FormItemSelectAjax
                            label={'Default Purchase Measurement'}
                            name={'inventory_default_purchase_measurement_id'}
                            url={'/api/measurements/option'}
                            {...formState}
                        />

                        <FormItemSelectAjax
                            label={'Default Sales Measurement'}
                            name={'inventory_default_sales_measurement_id'}
                            url={'/api/measurements/option'}
                            {...formState}
                        />

                    </ColForm>

                    <ColForm>
                        <FormItemSelectAjax
                            label={'Default Product Category'}
                            name={'inventory_default_product_category_id'}
                            url={'/api/product_categories/option'}
                            {...formState}
                        />
                    </ColForm>
                </RowForm>
            </FormCard>
        </CustomForm>
    );
};

export default GlobalSettingForm;
