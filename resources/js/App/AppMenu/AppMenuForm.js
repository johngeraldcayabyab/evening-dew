import React from 'react';
import {Form} from "antd";
import {useParams} from "react-router-dom";
import useFormHook from "../../Hooks/useFormHook";
import manifest from "./__manifest__.json";
import FormButtons from "../../Components/FormButtons/FormButtons";
import RowForm from "../../Components/Grid/RowForm";
import ColForm from "../../Components/Grid/ColForm";
import CustomForm from "../../Components/CustomForm";
import FormItemText from "../../Components/FormItem/FormItemText";
import ControlPanel from "../../Components/ControlPanel";
import FormCard from "../../Components/FormCard";
import FormItemSelectAjax from "../../Components/FormItem/FormItemSelectAjax";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {FormContextProvider} from "../../Contexts/FormContext";

const AppMenuForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest, true);
    return (
        <FormContextProvider value={{form: form, onFinish: formActions.onFinish}}>
            <CustomForm>
                <ControlPanel
                    topColOneLeft={<CustomBreadcrumb formState={formState}/>}
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
                                label={'Label'}
                                name={'label'}
                                message={'Please input label'}
                                required={true}
                                {...formState}
                            />
                            <FormItemSelectAjax
                                form={form}
                                label={'Menu'}
                                name={'menu_id'}
                                url={'/api/menus'}
                                {...formState}
                                query={'menu.label'}
                            />
                            <FormItemSelectAjax
                                form={form}
                                label={'Parent App Menu'}
                                name={'parent_app_menu_id'}
                                url={'/api/app_menus'}
                                {...formState}
                                query={'parent_app_menu.name'}
                            />
                        </ColForm>
                    </RowForm>
                </FormCard>
            </CustomForm>
        </FormContextProvider>
    );
};

export default AppMenuForm;
