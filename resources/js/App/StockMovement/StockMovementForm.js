import React from 'react';
import {Divider, Form} from "antd";
import {useParams} from "react-router-dom";
import useFormState from "../../Hooks/useFormState";
import manifest from "./__manifest__.json";
import FormButtons from "../../components/FormButtons/FormButtons";
import RowForm from "../../components/Grid/RowForm";
import ColForm from "../../components/Grid/ColForm";
import CustomForm from "../../components/CustomForm";
import ControlPanel from "../../components/ControlPanel";
import FormCard from "../../components/FormCard";
import FormItemText from "../../components/FormItem/FormItemText";
import FormItemSelect from "../../components/FormItem/FormItemSelect";
import FormItemNumber from "../../components/FormItem/FormItemNumber";
import FormItemSelectAjax from "../../components/FormItem/FormItemSelectAjax";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";

const StockMovementForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormState(id, form, manifest, true);

    return (
        <CustomForm
            form={form}
            onFinish={formActions.onFinish}
        >
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
                            label={'Reference'}
                            name={'reference'}
                            message={'Please input reference'}
                            required={true}
                            {...formState}
                        />
                        <FormItemText
                            form={form}
                            label={'Source'}
                            name={'source'}
                            {...formState}
                        />

                        <FormItemSelectAjax
                            form={form}
                            label={'Product'}
                            name={'product_id'}
                            message={'Please select product'}
                            required={true}
                            url={'/api/products/option'}
                            {...formState}
                            query={'product.name'}
                        />

                        <FormItemSelectAjax
                            form={form}
                            label={'Source Location'}
                            name={'source_location_id'}
                            message={'Please select source location'}
                            required={true}
                            url={'/api/locations/option'}
                            {...formState}
                            query={'source_location.name'}
                        />

                        <FormItemSelectAjax
                            form={form}
                            label={'Destination Location'}
                            name={'destination_location_id'}
                            message={'Please select destination location'}
                            required={true}
                            url={'/api/locations/option'}
                            {...formState}
                            query={'destination_location.name'}
                        />

                        <FormItemNumber
                            form={form}
                            label={'Quantity Done'}
                            name={'quantity_done'}
                            message={'Please input quantity done'}
                            required={true}
                            {...formState}
                        />
                    </ColForm>
                </RowForm>
            </FormCard>
        </CustomForm>
    );
};

export default StockMovementForm;
