import React from 'react';
import {Form} from "antd";
import {useParams} from "react-router-dom";
import useFormState from "../../Hooks/useFormState";
import manifest from "./__manifest__.json";
import FormButtons from "../../components/FormButtons/FormButtons";
import RowForm from "../../components/Grid/RowForm";
import ColForm from "../../components/Grid/ColForm";
import CustomForm from "../../components/CustomForm";
import FormItemText from "../../components/FormItem/FormItemText";
import FormItemNumber from "../../components/FormItem/FormItemNumber";
import FormItemSelect from "../../components/FormItem/FormItemSelect";
import ControlPanel from "../../components/ControlPanel";
import FormItemSelectAjax from "../../components/FormItem/FormItemSelectAjax";
import FormCard from "../../components/FormCard";

const MaterialForm = () => {
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
                        <FormItemSelectAjax
                            label={'Product'}
                            name={'product_id'}
                            message={'Please select a product'}
                            required={true}
                            url={'/api/products/option'}
                            {...formState}
                            query={'product.name'}
                        />

                        <FormItemNumber
                            label={'Quantity'}
                            name={'quantity'}
                            message={'Please input quantity'}
                            required={true}
                            {...formState}
                        />

                        <FormItemSelectAjax
                            label={'Measurement'}
                            name={'measurement_id'}
                            message={'Please select a measurement'}
                            required={true}
                            url={'/api/measurements/option'}
                            {...formState}
                            query={'measurement.name'}
                        />
                    </ColForm>

                    <ColForm>
                        <FormItemText
                            label={'Reference'}
                            name={'reference'}
                            {...formState}
                        />

                        <FormItemSelect
                            label={'Material Type'}
                            name={'material_type'}
                            message={'Please select a material type'}
                            required={true}
                            options={[
                                {value: 'manufacture_this_product', label: 'Manufacture this product'},
                                {value: 'kit', label: 'Kit'},
                            ]}
                            {...formState}
                        />
                    </ColForm>
                </RowForm>
            </FormCard>
        </CustomForm>
    );
};


export default MaterialForm;
