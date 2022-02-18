import React from 'react';
import {Form} from "antd";
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
import FormItemSelectAjax from "../components/FormItem/FormItemSelectAjax";
import FormItemUpload from "../components/FormItem/FormItemUpload";

const LocationForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormState(id, form, manifest);

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
                    <ColForm lg={24}>
                        <FormItemText
                            label={'Name'}
                            name={'name'}
                            message={'Please input name'}
                            required={true}
                            size={'large'}
                            {...formState}
                        />

                        <FormItemSelectAjax
                            label={'Parent Category'}
                            name={'parent_product_category_id'}
                            url={'/api/product_categories/option'}
                            size={'medium'}
                            {...formState}
                        />
                    </ColForm>
                </RowForm>

                {/*<RowForm>*/}
                {/*    <ColForm>*/}
                {/*        <FormItemText*/}
                {/*            label={'Category'}*/}
                {/*            name={'category'}*/}
                {/*            message={'Please input category'}*/}
                {/*            required={true}*/}
                {/*            size={'large'}*/}
                {/*            {...formState}*/}
                {/*        />*/}

                {/*        <FormItemSelectAjax*/}
                {/*            label={'Parent Category'}*/}
                {/*            name={'parent_product_category_id'}*/}
                {/*            url={'/api/product_categories/option'}*/}
                {/*            {...formState}*/}
                {/*        />*/}
                {/*    </ColForm>*/}
                {/*</RowForm>*/}
            </FormCard>
        </CustomForm>
    );
};

export default LocationForm;
