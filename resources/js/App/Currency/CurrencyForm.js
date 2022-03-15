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
import FormCard from "../../Components/FormCard";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";

const CurrencyForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormState(id, form, manifest, true);
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
                            label={'Currency'}
                            name={'currency'}
                            message={'Please input currency'}
                            required={true}
                            {...formState}
                        />

                        <FormItemText
                            form={form}
                            label={'Name'}
                            name={'name'}
                            {...formState}
                        />
                    </ColForm>

                    <ColForm>
                        <FormItemText
                            form={form}
                            label={'Unit'}
                            name={'unit'}
                            {...formState}
                        />
                        <FormItemText
                            form={form}
                            label={'Sub Unit'}
                            name={'sub_unit'}
                            {...formState}
                        />
                    </ColForm>
                </RowForm>

                <RowForm>
                    <ColForm>
                        <FormItemNumber
                            form={form}
                            label={'Rounding Factor'}
                            name={'rounding_factor'}
                            {...formState}
                        />
                        <FormItemNumber
                            form={form}
                            label={'Decimal Places'}
                            name={'decimal_places'}
                            {...formState}
                        />
                    </ColForm>
                    <ColForm>
                        <FormItemText
                            form={form}
                            label={'Symbol'}
                            name={'symbol'}
                            message={'Please input symbol'}
                            required={true}
                            {...formState}
                        />

                        <FormItemSelect
                            form={form}
                            label={'Symbol Position'}
                            name={'symbol_position'}
                            message={'Please select symbol position'}
                            required={true}
                            options={[
                                {value: 'after_amount', label: 'After Amount'},
                                {value: 'before_amount', label: 'Before Amount'},
                            ]}
                            {...formState}
                        />
                    </ColForm>
                </RowForm>
            </FormCard>
        </CustomForm>
    );
};


export default CurrencyForm;
