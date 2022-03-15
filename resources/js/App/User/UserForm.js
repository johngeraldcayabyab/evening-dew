import React from 'react';
import {Divider, Form} from "antd";
import {useParams} from "react-router-dom";
import useFormState from "../../Hooks/useFormState";
import manifest from "./__manifest__.json";
import FormButtons from "../../Components/FormButtons/FormButtons";
import RowForm from "../../Components/Grid/RowForm";
import ColForm from "../../Components/Grid/ColForm";
import CustomForm from "../../Components/CustomForm";
import ControlPanel from "../../Components/ControlPanel";
import FormCard from "../../Components/FormCard";
import FormItemText from "../../Components/FormItem/FormItemText";
import FormItemUpload from "../../Components/FormItem/FormItemUpload";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";

const UserForm = () => {
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
                            label={'Name'}
                            name={'name'}
                            message={'Please input name'}
                            required={true}
                            size={'large'}
                            {...formState}
                        />

                        <FormItemText
                            form={form}
                            label={'Email'}
                            name={'email'}
                            message={'Please input email'}
                            required={true}
                            size={'medium'}
                            {...formState}
                        />
                    </ColForm>

                    <ColForm>
                        <FormItemUpload
                            form={form}
                            name={'avatar'}
                            {...formState}
                        />
                    </ColForm>
                </RowForm>


                {!formState.id &&
                <>
                    <Divider/>
                    <RowForm>
                        <ColForm>
                            <FormItemText
                                form={form}
                                label={'Password'}
                                name={'password'}
                                message={'Please input password'}
                                required={true}
                                {...formState}
                            />
                        </ColForm>
                        <ColForm>
                            <FormItemText
                                form={form}
                                label={'Confirm Password'}
                                name={'password_confirmation'}
                                message={'Please input password'}
                                required={true}
                                {...formState}
                            />
                        </ColForm>
                    </RowForm>
                </>
                }

            </FormCard>
        </CustomForm>
    );
};

export default UserForm;
