import React from 'react';
import {Form} from "antd";
import {useParams} from "react-router-dom";
import useFormState from "../../Hooks/useFormState";
import manifest from "./__manifest__.json";
import FormButtons from "../../Components/FormButtons/FormButtons";
import RowForm from "../../Components/Grid/RowForm";
import ColForm from "../../Components/Grid/ColForm";
import CustomForm from "../../Components/CustomForm";
import FormItemText from "../../Components/FormItem/FormItemText";
import FormItemNumber from "../../Components/FormItem/FormItemNumber";
import FormItemSelect from "../../Components/FormItem/FormItemSelect";
import ControlPanel from "../../Components/ControlPanel";
import FormItemSelectAjax from "../../Components/FormItem/FormItemSelectAjax";
import FormCard from "../../Components/FormCard";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";

const MeasurementForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormState(id, form, manifest, true);
    return (
        <CustomForm
            form={form}
            onFinish={formActions.onFinish}
        >
            <ControlPanel
                topColOneLeft={<CustomBreadcrumb formState={formState}/>}
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
                            label={'Name'}
                            name={'name'}
                            message={'Please input measurement category name'}
                            required={true}
                            {...formState}
                        />

                        <FormItemSelect
                            label={'Type'}
                            name={'type'}
                            message={'Please select a type'}
                            required={true}
                            options={[
                                {value: 'reference', label: 'Reference measurement for this category'},
                                {value: 'smaller', label: 'Smaller than the reference measurement'},
                                {value: 'bigger', label: 'Bigger than the reference measurement'},
                            ]}
                            {...formState}
                        />

                        <FormItemNumber
                            label={'Ratio'}
                            name={'ratio'}
                            message={'Please input ratio'}
                            required={true}
                            {...formState}
                        />
                        <FormItemNumber
                            label={'Rounding precision'}
                            name={'rounding_precision'}
                            message={'Please input rounding precision'}
                            required={true}
                            {...formState}
                        />

                        <FormItemSelectAjax
                            label={'Measurement Category'}
                            name={'measurement_category_id'}
                            message={'Please select a measurement category'}
                            required={true}
                            url={'/api/measurement_categories/option'}
                            {...formState}
                            query={'measurement_category.name'}
                        />
                    </ColForm>
                </RowForm>
            </FormCard>
        </CustomForm>
    );
};


export default MeasurementForm;
