import React from 'react';
import {Divider, Form} from "antd";
import {useParams} from "react-router-dom";
import useFormHook from "../../Hooks/useFormHook";
import manifest from "./sequence_manifest.json";
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
import NextPreviousRecord from "../../Components/NextPreviousRecord";

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
                    bottomColTwoRight={<NextPreviousRecord/>}
                />
                <FormCard>
                    <RowForm>
                        <ColForm>
                            <FormItemText
                                label={'Name'}
                                name={'name'}
                                message={'Please input name'}
                                required={true}
                            />
                            <FormItemSelect
                                label={'Implementation'}
                                name={'implementation'}
                                message={'Please select an implementation'}
                                required={true}
                                options={[
                                    {value: 'no_gap', label: 'No Gap'},
                                    {value: 'standard', label: 'Standard'},
                                ]}
                            />
                        </ColForm>
                        <ColForm>
                            <FormItemText
                                label={'Sequence Code'}
                                name={'sequence_code'}
                                message={'Please input sequence code'}
                                required={true}
                            />
                        </ColForm>
                    </RowForm>
                    <Divider/>
                    <RowForm>
                        <ColForm>
                            <FormItemText
                                label={'Prefix'}
                                name={'prefix'}
                            />
                            <FormItemText
                                label={'Suffix'}
                                name={'suffix'}
                            />
                        </ColForm>
                        <ColForm>
                            <FormItemNumber
                                label={'Sequence Size'}
                                name={'sequence_size'}
                                message={'Please input sequence size'}
                                required={true}
                            />
                            <FormItemNumber
                                label={'Step'}
                                name={'step'}
                                message={'Please input step'}
                                required={true}
                            />
                            <FormItemNumber
                                label={'Next number'}
                                name={'next_number'}
                                message={'Please input next number'}
                                required={true}
                            />
                        </ColForm>
                    </RowForm>
                </FormCard>
            </CustomForm>
        </FormContextProvider>
    );
};

export default SequenceForm;
