import React, {useEffect} from 'react';
import {Form} from "antd";
import {useParams} from "react-router-dom";
import useFormHook from "../../Hooks/useFormHook";
import manifest from "./app_menu_manifest.json";
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

const AppMenuForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest, true);
    const menuOptions = useOptionHook('/api/menus', 'menu.label');
    const appMenuOptions = useOptionHook('/api/app_menus', 'parent_app_menu.label');

    useEffect(() => {
        menuOptions.getInitialOptions(formState);
        appMenuOptions.getInitialOptions(formState);
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
                                label={'Label'}
                                name={'label'}
                                message={'Please input label'}
                                required={true}
                            />
                            <FormItemSelect
                                label={'Menu'}
                                name={'menu_id'}
                                {...menuOptions}
                            />
                            <FormItemSelect
                                label={'Parent App Menu'}
                                name={'parent_app_menu_id'}
                                {...appMenuOptions}
                            />
                        </ColForm>
                    </RowForm>
                </FormCard>
            </CustomForm>
        </FormContextProvider>
    );
};

export default AppMenuForm;
