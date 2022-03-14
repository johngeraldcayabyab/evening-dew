import React from 'react';
import {Form} from "antd";
import {useParams} from "react-router-dom";
import useFormState from "../../Hooks/useFormState";
import manifest from "./__manifest__.json";
import FormButtons from "../../components/FormButtons/FormButtons";
import RowForm from "../../components/Grid/RowForm";
import ColForm from "../../components/Grid/ColForm";
import CustomForm from "../../components/CustomForm";
import ControlPanel from "../../components/ControlPanel";
import FormCard from "../../components/FormCard";
import FormItemText from "../../components/FormItem/FormItemText";
import FormItemSelectAjax from "../../components/FormItem/FormItemSelectAjax";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";

const ProductCategoryForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormState(id, form, manifest, true);

    return (
        <CustomForm
            form={form}
            onFinish={formActions.onFinish}
        >
            <ControlPanel
                topColOneLeft={<CustomBreadcrumb/>}
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
                            label={'Category'}
                            name={'category'}
                            message={'Please input category'}
                            required={true}
                            size={'large'}
                            {...formState}
                        />

                        <FormItemSelectAjax
                            form={form}
                            label={'Parent Category'}
                            name={'parent_product_category_id'}
                            url={'/api/product_categories/option'}
                            {...formState}
                            query={'parent_category.name'}
                        />
                    </ColForm>
                </RowForm>
            </FormCard>
        </CustomForm>
    );
};

export default ProductCategoryForm;
