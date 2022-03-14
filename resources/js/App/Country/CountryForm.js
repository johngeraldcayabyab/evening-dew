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
import ControlPanel from "../../components/ControlPanel";
import FormCard from "../../components/FormCard";
import FormItemSelectAjax from "../../components/FormItem/FormItemSelectAjax";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";

const CountryForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormState(id, form, manifest);
    return (
        <CustomForm
            form={form}
            onFinish={formActions.onFinish}
        >
            <ControlPanel
                topColOneLeft={<CustomBreadcrumb reload={formState.initialLoad}/>}
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
                            label={'Country Name'}
                            name={'country_name'}
                            message={'Please input country name'}
                            required={true}
                            {...formState}
                        />

                        <FormItemSelectAjax
                            form={form}
                            label={'Currency'}
                            name={'currency_id'}
                            url={'/api/currencies/option'}
                            {...formState}
                            query={'currency.currency'}
                        />

                        <FormItemText
                            form={form}
                            label={'Country Code'}
                            name={'country_code'}
                            {...formState}
                        />
                    </ColForm>

                    <ColForm>
                        <FormItemText
                            form={form}
                            label={'Country Calling Code'}
                            name={'country_calling_code'}
                            {...formState}
                        />
                    </ColForm>
                </RowForm>
            </FormCard>
        </CustomForm>
    );
};


export default CountryForm;
