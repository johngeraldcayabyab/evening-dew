import React, {useEffect} from 'react';
import {Form, Tabs} from "antd";
import {useParams} from "react-router-dom";
import useFormHook from "../../Hooks/useFormHook";
import FormButtons from "../../Components/FormButtons/FormButtons";
import RowForm from "../../Components/Grid/RowForm";
import ColForm from "../../Components/Grid/ColForm";
import CustomForm from "../../Components/CustomForm";
import FormItemText from "../../Components/FormItem/FormItemText";
import FormItemSelect from "../../Components/FormItem/FormItemSelect";
import ControlPanel from "../../Components/ControlPanel";
import FormCard from "../../Components/FormCard";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {FormContextProvider} from "../../Contexts/FormContext";
import FormItemCheckbox from "../../Components/FormItem/FormItemCheckbox";
import FormLineParent from "../../Components/FormLines/FormLineParent";
import FormItemLineId from "../../Components/FormItem/FormItemLineId";
import useOptionLineHook from "../../Hooks/useOptionLineHook";
import useOptionHook from "../../Hooks/useOptionHook";
import NextPreviousRecord from "../../Components/NextPreviousRecord";
import FormItemNumber from "../../Components/FormItem/FormItemNumber";
import DeliveryFeeManifest from "./DeliveryFeeManifest"
import FormGenerator from "../../Components/Form/FormGenerator";

const {TabPane} = Tabs;

const DeliveryFeeForm = () => {
    // return <FormGenerator {...DeliveryFeeManifest}/>;
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, DeliveryFeeManifest, true);
    const productOptions = useOptionHook('/api/products', 'product.name');
    const cityOptions = useOptionLineHook('/api/cities', 'city.name', 'delivery_fee_lines');


    useEffect(() => {
        productOptions.getInitialOptions(formState);
        cityOptions.getInitialOptions(formState);
    }, [formState.initialValues]);

    return (
        <FormContextProvider
            value={{
                id: id,
                manifest: DeliveryFeeManifest,
                form: form,
                formState: formState,
                formActions: formActions,
                onFinish: formActions.onFinish,
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
                                label={'Name'}
                                name={'name'}
                                message={'Please input name'}
                                required={true}
                            />

                            <FormItemCheckbox
                                label={'Enabled'}
                                name={'is_enabled'}
                            />
                        </ColForm>
                        <ColForm>
                            <FormItemSelect
                                label={'Product'}
                                name={'product_id'}
                                {...productOptions}
                                message={'Please select product'}
                                required={true}
                            />
                        </ColForm>
                    </RowForm>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Fee Lines" key="1">
                            <RowForm>
                                <ColForm lg={24}>
                                    <FormLineParent
                                        columns={['City']}
                                        listName={'delivery_fee_lines'}
                                    >
                                        <FormItemLineId name={'id'}/>
                                        <FormItemSelect
                                            placeholder={'City'}
                                            name={'city_id'}
                                            message={'Please select a city'}
                                            required={true}
                                            optionAggregate={cityOptions}
                                            dropdownRender={cityOptions}
                                        />
                                        <FormItemNumber
                                            placeholder={'Fee'}
                                            name={'fee'}
                                        />
                                    </FormLineParent>
                                </ColForm>
                            </RowForm>
                        </TabPane>
                    </Tabs>
                </FormCard>
            </CustomForm>
        </FormContextProvider>
    );
};


export default DeliveryFeeForm;
