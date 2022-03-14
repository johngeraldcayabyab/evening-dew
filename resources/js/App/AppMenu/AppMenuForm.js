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

const AppMenuForm = () => {
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
                            url={'/api/menus/option'}
                            {...formState}
                            query={'menu.label'}
                        />
                        <FormItemSelectAjax
                            form={form}
                            label={'Parent App Menu'}
                            name={'parent_app_menu_id'}
                            url={'/api/app_menus/option'}
                            {...formState}
                            query={'parent_app_menu.name'}
                        />
                    </ColForm>
                </RowForm>
            </FormCard>
        </CustomForm>
    );
};

export default AppMenuForm;
