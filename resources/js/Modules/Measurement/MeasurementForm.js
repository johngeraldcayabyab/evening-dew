import React, {useEffect} from 'react';
import {Form} from "antd";
import {useParams} from "react-router-dom";
import useFormHook from "../../Hooks/useFormHook";
import manifest from "./measurement_manifest.json";
import FormButtons from "../../Components/FormButtons/FormButtons";
import RowForm from "../../Components/Grid/RowForm";
import ColForm from "../../Components/Grid/ColForm";
import CustomForm from "../../Components/CustomForm";
import FormItemText from "../../Components/FormItem/FormItemText";
import FormItemNumber from "../../Components/FormItem/FormItemNumber";
import ControlPanel from "../../Components/ControlPanel";
import FormCard from "../../Components/FormCard";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {FormContextProvider} from "../../Contexts/FormContext";
import FormItemSelect from "../../Components/FormItem/FormItemSelect";
import useOptionHook from "../../Hooks/useOptionHook";
import NextPreviousRecord from "../../Components/NextPreviousRecord";

const MeasurementForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest, true);
    const measurementCategoryOptions = useOptionHook('/api/measurement_categories', 'measurement_category.name');
    useEffect(() => {
        measurementCategoryOptions.getInitialOptions(formState);
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
                    <RowForm>
                        <ColForm>
                            <FormItemText
                                label={'Name'}
                                name={'name'}
                                message={'Please input measurement category name'}
                                required={true}
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
                            />

                            <FormItemNumber
                                label={'Ratio'}
                                name={'ratio'}
                                message={'Please input ratio'}
                                required={true}
                            />
                            <FormItemNumber
                                label={'Rounding precision'}
                                name={'rounding_precision'}
                                message={'Please input rounding precision'}
                                required={true}
                            />

                            <FormItemSelect
                                label={'Measurement Category'}
                                name={'measurement_category_id'}
                                message={'Please select a measurement category'}
                                required={true}
                                {...measurementCategoryOptions}
                            />
                        </ColForm>
                    </RowForm>
                </FormCard>
            </CustomForm>
        </FormContextProvider>
    );
};


export default MeasurementForm;
