import React, {useEffect} from 'react';
import {Form} from "antd";
import {useParams} from "react-router-dom";
import useFormHook from "../../Hooks/useFormHook";
import manifest from "./country_manifest.json";
import FormButtons from "../../Components/FormButtons/FormButtons";
import RowForm from "../../Components/Grid/RowForm";
import ColForm from "../../Components/Grid/ColForm";
import CustomForm from "../../Components/CustomForm";
import FormItemText from "../../Components/FormItem/FormItemText";
import ControlPanel from "../../Components/ControlPanel";
import FormCard from "../../Components/FormCard";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {FormContextProvider} from "../../Contexts/FormContext";
import FormItemSelect from "../../Components/FormItem/FormItemSelect";
import useOptionHook from "../../Hooks/useOptionHook";
import NextPreviousRecord from "../../Components/NextPreviousRecord";

const CountryForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest);
    const currencyOptions = useOptionHook('/api/currencies', 'currency.currency');

    useEffect(() => {
        currencyOptions.getInitialOptions(formState);
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
                                label={'Country Name'}
                                name={'country_name'}
                                message={'Please input country name'}
                                required={true}
                            />

                            <FormItemSelect
                                label={'Currency'}
                                name={'currency_id'}
                                {...currencyOptions}
                            />

                            <FormItemText
                                label={'Country Code'}
                                name={'country_code'}
                            />
                        </ColForm>

                        <ColForm>
                            <FormItemText
                                label={'Country Calling Code'}
                                name={'country_calling_code'}
                            />
                        </ColForm>
                    </RowForm>
                </FormCard>
            </CustomForm>
        </FormContextProvider>
    );
};


export default CountryForm;
