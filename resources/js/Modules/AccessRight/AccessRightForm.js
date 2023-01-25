import React, {useEffect} from 'react';
import {Form} from "antd";
import {useParams} from "react-router-dom";
import useFormHook from "../../Hooks/useFormHook";
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
import FormItemCheckbox from "../../Components/FormItem/FormItemCheckbox"
import AccessRight from "./AccessRightManifest"

const AccessRightForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, AccessRight, true);
    const groupOptions = useOptionHook('/api/groups', 'group.name');

    useEffect(() => {
        groupOptions.getInitialOptions(formState);
    }, [formState.initialLoad]);

    return (
        <FormContextProvider
            value={{
                id: id,
                manifest: AccessRight,
                form: form,
                formState: formState,
                formActions: formActions,
                onFinish: formActions.onFinish
            }}
        >
            <CustomForm>
                <ControlPanel
                    topColOneLeft={<CustomBreadcrumb/>}
                    bottomColOneLeft={<FormButtons edit={true} create={true}/>}
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
                                label={'Group'}
                                name={'group_id'}
                                {...groupOptions}
                            />

                            <FormItemCheckbox
                                label={'Read access'}
                                name={'read_access'}
                            />

                            <FormItemCheckbox
                                label={'Write access'}
                                name={'write_access'}
                            />

                            <FormItemCheckbox
                                label={'Create Access'}
                                name={'create_access'}
                            />

                            <FormItemCheckbox
                                label={'Delete Access'}
                                name={'delete_access'}
                            />
                        </ColForm>
                    </RowForm>
                </FormCard>
            </CustomForm>
        </FormContextProvider>
    );
};


export default AccessRightForm;
