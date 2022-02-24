import React from 'react';
import {Divider, Form} from "antd";
import {useParams} from "react-router-dom";
import useFormState from "../Hooks/useFormState";
import manifest from "./__manifest__.json";
import FormButtons from "../components/FormButtons/FormButtons";
import RowForm from "../components/Grid/RowForm";
import ColForm from "../components/Grid/ColForm";
import CustomForm from "../components/CustomForm";
import ControlPanel from "../components/ControlPanel";
import FormCard from "../components/FormCard";
import FormItemText from "../components/FormItem/FormItemText";
import FormItemSelect from "../components/FormItem/FormItemSelect";
import FormItemNumber from "../components/FormItem/FormItemNumber";

const SequenceForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormState(id, form, manifest, true);

    return (
        <CustomForm
            form={form}
            onFinish={formActions.onFinish}
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
    );
};

export default SequenceForm;
