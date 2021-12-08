import React from 'react';
import {Form} from "antd";
import {useParams} from "react-router-dom";
import useFormState from "../Hooks/useFormState";
import manifest from "./__manifest__.json";
import FormButtons from "../components/ActionButtons/FormButtons";
import RowForm from "../components/Grid/RowForm";
import ColForm from "../components/Grid/ColForm";
import CustomForm from "../components/CustomForm";
import FormItemText from "../components/FormItem/FormItemText";
import FormItemNumber from "../components/FormItem/FormItemNumber";
import FormItemSelect from "../components/FormItem/FormItemSelect";
import ControlPanel from "../components/ControlPanel";
import FormCard from "../components/FormCard";
import FormItemSelectAjax from "../components/FormItem/FormItemSelectAjax";

const MeasurementForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormState(id, form, manifest);
    return (
        <CustomForm
            form={form}
            onFinish={formActions.onFinish}
            initialValues={{
                type: 'reference',
                ratio: 1,
                rounding_precision: 0.01,
                ...formState.initialValues
            }}
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
            <FormCard>
                <RowForm>
                    <ColForm>
                        <FormItemText
                            label={'Name'}
                            name={'name'}
                            errors={formState.errors}
                            message={'Please input measurement category name'}
                            required={true}
                            formDisabled={formState.formDisabled}
                        />

                        <FormItemSelect
                            label={'Type'}
                            name={'type'}
                            errors={formState.errors}
                            message={'Please select a type'}
                            required={true}
                            formDisabled={formState.formDisabled}
                            options={[
                                {value: 'reference', label: 'Reference measurement for this category'},
                                {value: 'smaller', label: 'Smaller than the reference measurement'},
                                {value: 'bigger', label: 'Bigger than the reference measurement'},
                            ]}
                        />

                        <FormItemNumber
                            label={'Ratio'}
                            name={'ratio'}
                            errors={formState.errors}
                            message={'Please input ratio'}
                            required={true}
                            formDisabled={formState.formDisabled}
                        />

                        <FormItemNumber
                            label={'Rounding precision'}
                            name={'rounding_precision'}
                            errors={formState.errors}
                            message={'Please input rounding precision'}
                            required={true}
                            formDisabled={formState.formDisabled}
                        />

                        <FormItemSelectAjax
                            label={'Measurement Category'}
                            name={'measurement_category_id'}
                            errors={formState.errors}
                            message={'Please select a measurement category'}
                            required={true}
                            formDisabled={formState.formDisabled}
                            url={'/api/measurement_categories/option'}
                        />
                    </ColForm>
                </RowForm>
            </FormCard>
        </CustomForm>
    );
};


export default MeasurementForm;
