import React, {useEffect} from 'react';
import {Form} from "antd";
import {useParams} from "react-router-dom";
import useFormHook from "../../Hooks/useFormHook";
import manifest from "./product_category_manifest.json";
import FormButtons from "../../Components/FormButtons/FormButtons";
import RowForm from "../../Components/Grid/RowForm";
import ColForm from "../../Components/Grid/ColForm";
import CustomForm from "../../Components/CustomForm";
import ControlPanel from "../../Components/ControlPanel";
import FormCard from "../../Components/FormCard";
import FormItemText from "../../Components/FormItem/FormItemText";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {FormContextProvider} from "../../Contexts/FormContext";
import useOptionHook from "../../Hooks/useOptionHook";
import FormItemSelect from "../../Components/FormItem/FormItemSelect";
import NextPreviousRecord from "../../Components/NextPreviousRecord";

const ProductCategoryForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest, true);
    const parentCategoryOptions = useOptionHook('/api/product_categories', 'parent_category.category');

    useEffect(() => {
        parentCategoryOptions.getInitialOptions(formState);
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
                                label={'Category'}
                                name={'category'}
                                message={'Please input category'}
                                required={true}
                                size={'large'}
                            />
                            <FormItemSelect
                                label={'Parent Category'}
                                name={'parent_product_category_id'}
                                {...parentCategoryOptions}
                            />
                        </ColForm>
                    </RowForm>
                </FormCard>
            </CustomForm>
        </FormContextProvider>
    );
};

export default ProductCategoryForm;
