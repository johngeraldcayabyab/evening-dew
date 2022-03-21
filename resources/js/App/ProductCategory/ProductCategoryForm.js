import React from 'react';
import {Form} from "antd";
import {useParams} from "react-router-dom";
import useFormHook from "../../Hooks/useFormHook";
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
import {FormContextProvider} from "../../Contexts/FormContext";

const ProductCategoryForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest, true);

    return (
        <FormContextProvider
            value={{
                id: id,
                manifest: manifest,
                form: form,
                formState: formState,
                onFinish: formActions.onFinish
            }}
        >
            <CustomForm>
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
                                url={'/api/product_categories'}
                                {...formState}
                                query={'parent_category.name'}
                            />
                        </ColForm>
                    </RowForm>
                </FormCard>
            </CustomForm>
        </FormContextProvider>
    );
};

export default ProductCategoryForm;
