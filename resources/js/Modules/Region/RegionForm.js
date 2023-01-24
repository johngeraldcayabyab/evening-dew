import React, {useEffect} from 'react';
import {Form} from "antd";
import {useParams} from "react-router-dom";
import useFormHook from "../../Hooks/useFormHook";
import manifest from "./region_manifest.json";
import FormButtons from "../../Components/FormButtons/FormButtons";
import RowForm from "../../Components/Grid/RowForm";
import ColForm from "../../Components/Grid/ColForm";
import CustomForm from "../../Components/CustomForm";
import FormItemText from "../../Components/FormItem/FormItemText";
import ControlPanel from "../../Components/ControlPanel";
import FormCard from "../../Components/FormCard";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {FormContextProvider} from "../../Contexts/FormContext";
import useOptionHook from "../../Hooks/useOptionHook";
import FormItemSelect from "../../Components/FormItem/FormItemSelect";
import NextPreviousRecord from "../../Components/NextPreviousRecord";

const RegionForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest);

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
                                label={'Region'}
                                name={'region'}
                                message={'Please input region'}
                                required={true}
                                size={'large'}
                            />

                            <FormItemText
                                label={'Region Center'}
                                name={'region_center'}
                                message={'Please input region center'}
                                required={true}
                                size={'large'}
                            />
                        </ColForm>
                    </RowForm>
                </FormCard>
            </CustomForm>
        </FormContextProvider>
    );
};


export default RegionForm;
