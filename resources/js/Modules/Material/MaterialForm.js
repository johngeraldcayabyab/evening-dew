import React, {useEffect} from 'react';
import {Form, Tabs, Tooltip} from "antd";
import {useParams} from "react-router-dom";
import useFormHook from "../../Hooks/useFormHook";
import manifest from "./__manifest__.json";
import FormButtons from "../../Components/FormButtons/FormButtons";
import RowForm from "../../Components/Grid/RowForm";
import ColForm from "../../Components/Grid/ColForm";
import CustomForm from "../../Components/CustomForm";
import FormItemText from "../../Components/FormItem/FormItemText";
import FormItemNumber from "../../Components/FormItem/FormItemNumber";
import ControlPanel from "../../Components/ControlPanel";
import FormCard from "../../Components/FormCard";
import {getPersistedKey, isLineFieldExecute} from "../../Helpers/form";
import useFetchCatcherHook from "../../Hooks/useFetchCatcherHook";
import {GET} from "../../consts";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import useFetchHook from "../../Hooks/useFetchHook";
import {FormContextProvider} from "../../Contexts/FormContext";
import useOptionHook from "../../Hooks/useOptionHook";
import FormItemSelect from "../../Components/FormItem/FormItemSelect";
import useOptionLineHook from "../../Hooks/useOptionLineHook";
import FormLineParent from "../../Components/FormLines/FormLineParent";
import FormItemLineId from "../../Components/FormItem/FormItemLineId";
import NextPreviousRecord from "../../Components/NextPreviousRecord";
import {InfoCircleOutlined} from "@ant-design/icons";

const {TabPane} = Tabs;

const MaterialForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest, true);
    const useFetch = useFetchHook();
    const fetchCatcher = useFetchCatcherHook();
    const productOptions = useOptionHook('/api/products', 'product.name');
    const measurementOptions = useOptionHook('/api/measurements', 'measurement.name');
    const productLineOptions = useOptionLineHook('/api/products', 'product.name');
    const measurementLineOptions = useOptionLineHook('/api/measurements', 'measurement.name');

    useEffect(() => {
        productOptions.getInitialOptions(formState, {product_type: 'consumable'});
        measurementOptions.getInitialOptions(formState);
        productLineOptions.getInitialOptions(formState, 'material_lines');
        measurementLineOptions.getInitialOptions(formState, 'material_lines');
    }, [formState.initialLoad]);

    function onValuesChange(changedValues, allValues) {
        isLineFieldExecute(changedValues, allValues, 'material_lines', 'product_id', getProductInfoAndSetValues);
    }

    function getProductInfoAndSetValues(line, allValues) {
        useFetch(`/api/products/${line.product_id}`, GET).then((response) => {
            const materialLines = allValues.material_lines;
            materialLines[line.key] = {
                ...materialLines[line.key],
                measurement_id: response.measurement_id,
            };
            form.setFieldsValue({
                material_lines: materialLines
            });
            const persistedKey = getPersistedKey(line, measurementLineOptions.options)
            measurementLineOptions.getOptions(response.measurement.name, persistedKey);
        }).catch((responseErr) => {
            fetchCatcher.get(responseErr);
        });
    }

    return (
        <FormContextProvider
            value={{
                id: id,
                manifest: manifest,
                form: form,
                formState: formState,
                formActions: formActions,
                onFinish: formActions.onFinish,
                onValuesChange: onValuesChange,
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
                            <FormItemSelect
                                label={<>Product <Tooltip
                                    title="Product type should be consumable or service"><InfoCircleOutlined/></Tooltip></>}
                                name={'product_id'}
                                message={'Please select a product'}
                                required={true}
                                {...productOptions}
                            />

                            <FormItemSelect
                                label={'Measurement'}
                                name={'measurement_id'}
                                message={'Please select a measurement'}
                                required={true}
                                {...measurementOptions}
                            />
                        </ColForm>

                        <ColForm>
                            <FormItemText
                                label={'Reference'}
                                name={'reference'}
                            />

                            <FormItemSelect
                                label={'Material Type'}
                                name={'material_type'}
                                message={'Please select a material type'}
                                required={true}
                                options={[
                                    {value: 'manufacture_this_product', label: 'Manufacture this product'},
                                    {value: 'kit', label: 'Kit'},
                                ]}
                            />
                        </ColForm>
                    </RowForm>

                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Components" key="1">
                            <RowForm>
                                <ColForm lg={24}>
                                    <FormLineParent
                                        columns={['Product', 'Quantity', 'Measurement']}
                                        listName={'material_lines'}
                                    >
                                        <FormItemLineId
                                            name={'id'}
                                        />
                                        <FormItemSelect
                                            placeholder={'Product'}
                                            name={'product_id'}
                                            message={'Please select a product'}
                                            required={true}
                                            optionAggregate={productLineOptions}
                                        />
                                        <FormItemNumber
                                            placeholder={'Quantity'}
                                            name={'quantity'}
                                            message={'Please input a quantity'}
                                            required={true}
                                        />
                                        <FormItemSelect
                                            placeholder={'Measurement'}
                                            name={'measurement_id'}
                                            message={'Please select a measurement'}
                                            required={true}
                                            optionAggregate={measurementLineOptions}
                                        />
                                    </FormLineParent>
                                </ColForm>
                            </RowForm>
                        </TabPane>
                        <TabPane tab="Miscellaneous" key="2">
                            <RowForm>
                                <ColForm>
                                    <FormItemSelect
                                        label={'Flexible Consumption'}
                                        name={'flexible_consumption'}
                                        message={'Please select a flexible consumption'}
                                        required={true}
                                        options={[
                                            {value: 'allowed', label: 'Allowed'},
                                            {value: 'allowed_with_warning', label: 'Allowed with warning'},
                                            {value: 'blocked', label: 'Blocked'},
                                        ]}
                                    />
                                </ColForm>
                            </RowForm>
                        </TabPane>
                    </Tabs>
                </FormCard>
            </CustomForm>
        </FormContextProvider>
    );
};


export default MaterialForm;
