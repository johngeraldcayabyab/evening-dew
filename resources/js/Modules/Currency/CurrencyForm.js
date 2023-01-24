import React from 'react';
import {Form} from "antd";
import {useParams} from "react-router-dom";
import useFormHook from "../../Hooks/useFormHook";
import manifest from "./currency_manifest.json";
import FormButtons from "../../Components/FormButtons/FormButtons";
import RowForm from "../../Components/Grid/RowForm";
import ColForm from "../../Components/Grid/ColForm";
import CustomForm from "../../Components/CustomForm";
import FormItemText from "../../Components/FormItem/FormItemText";
import FormItemNumber from "../../Components/FormItem/FormItemNumber";
import FormItemSelect from "../../Components/FormItem/FormItemSelect";
import ControlPanel from "../../Components/ControlPanel";
import FormCard from "../../Components/FormCard";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {FormContextProvider} from "../../Contexts/FormContext";
import NextPreviousRecord from "../../Components/NextPreviousRecord";

const CurrencyForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest, true);
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
                                label={'Currency'}
                                name={'currency'}
                                message={'Please input currency'}
                                required={true}
                            />

                            <FormItemText
                                label={'Name'}
                                name={'name'}
                            />
                        </ColForm>

                        <ColForm>
                            <FormItemText
                                label={'Unit'}
                                name={'unit'}
                            />
                            <FormItemText
                                label={'Sub Unit'}
                                name={'sub_unit'}
                            />
                        </ColForm>
                    </RowForm>

                    <RowForm>
                        <ColForm>
                            <FormItemNumber
                                label={'Rounding Factor'}
                                name={'rounding_factor'}
                            />
                            <FormItemNumber
                                label={'Decimal Places'}
                                name={'decimal_places'}
                            />
                        </ColForm>
                        <ColForm>
                            <FormItemText
                                label={'Symbol'}
                                name={'symbol'}
                                message={'Please input symbol'}
                                required={true}
                            />

                            <FormItemSelect
                                label={'Symbol Position'}
                                name={'symbol_position'}
                                message={'Please select symbol position'}
                                required={true}
                                options={[
                                    {value: 'after_amount', label: 'After Amount'},
                                    {value: 'before_amount', label: 'Before Amount'},
                                ]}
                            />
                        </ColForm>
                    </RowForm>
                </FormCard>
            </CustomForm>
        </FormContextProvider>
    );
};


export default CurrencyForm;
