import React from 'react';
import {Divider, Form} from "antd";
import {useParams} from "react-router-dom";
import useFormHook from "../../Hooks/useFormHook";
import manifest from "./__manifest__.json";
import FormButtons from "../../Components/FormButtons/FormButtons";
import RowForm from "../../Components/Grid/RowForm";
import ColForm from "../../Components/Grid/ColForm";
import CustomForm from "../../Components/CustomForm";
import ControlPanel from "../../Components/ControlPanel";
import FormCard from "../../Components/FormCard";
import FormItemText from "../../Components/FormItem/FormItemText";
import FormItemSelect from "../../Components/FormItem/FormItemSelect";
import FormItemNumber from "../../Components/FormItem/FormItemNumber";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {FormContextProvider} from "../../Contexts/FormContext";

const SequenceForm = () => {
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
                />
                <FormCard {...formState}>
                    <RowForm>
                        <ColForm>
                            <FormItemText
                                form={form}
                                label={'Name'}
                                name={'name'}
                                message={'Please input name'}
                                required={true}
                                {...formState}
                            />
                            <FormItemSelect
                                form={form}
                                label={'Implementation'}
                                name={'implementation'}
                                message={'Please select an implementation'}
                                required={true}
                                options={[
                                    {value: 'no_gap', label: 'No Gap'},
                                    {value: 'standard', label: 'Standard'},
                                ]}
                                {...formState}
                            />
                        </ColForm>
                        <ColForm>
                            <FormItemText
                                form={form}
                                label={'Sequence Code'}
                                name={'sequence_code'}
                                message={'Please input sequence code'}
                                required={true}
                                {...formState}
                            />
                        </ColForm>
                    </RowForm>
                    <Divider/>
                    <RowForm>
                        <ColForm>
                            <FormItemText
                                form={form}
                                label={'Prefix'}
                                name={'prefix'}
                                {...formState}
                            />
                            <FormItemText
                                form={form}
                                label={'Suffix'}
                                name={'suffix'}
                                {...formState}
                            />
                        </ColForm>
                        <ColForm>
                            <FormItemNumber
                                form={form}
                                label={'Sequence Size'}
                                name={'sequence_size'}
                                message={'Please input sequence size'}
                                required={true}
                                {...formState}
                            />
                            <FormItemNumber
                                form={form}
                                label={'Step'}
                                name={'step'}
                                message={'Please input step'}
                                required={true}
                                {...formState}
                            />
                            <FormItemNumber
                                form={form}
                                label={'Next number'}
                                name={'next_number'}
                                message={'Please input next number'}
                                required={true}
                                {...formState}
                            />
                        </ColForm>
                    </RowForm>
                </FormCard>
            </CustomForm>
        </FormContextProvider>
    );
};

export default SequenceForm;
