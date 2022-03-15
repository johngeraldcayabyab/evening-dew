import React from 'react';
import {Form} from "antd";
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
import FormItemSelectAjax from "../../Components/FormItem/FormItemSelectAjax";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";

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
