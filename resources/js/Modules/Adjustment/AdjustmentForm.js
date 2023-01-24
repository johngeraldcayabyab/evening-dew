import React, {useEffect, useState} from 'react';
import {Form} from "antd";
import {useParams} from "react-router-dom";
import useFormHook from "../../Hooks/useFormHook";
import manifest from "./adjustment_manifest.json";
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
import {GET, POST} from "../../consts";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import useFetchHook from "../../Hooks/useFetchHook";
import {FormContextProvider} from "../../Contexts/FormContext";
import useOptionHook from "../../Hooks/useOptionHook";
import FormItemSelect from "../../Components/FormItem/FormItemSelect";
import useOptionLineHook from "../../Hooks/useOptionLineHook";
import FormItemStatus from "../../Components/FormItem/FormItemStatus";
import StatusBar from "../../Components/StatusBar";
import FormLineParent from "../../Components/FormLines/FormLineParent";
import FormItemLineId from "../../Components/FormItem/FormItemLineId";
import NextPreviousRecord from "../../Components/NextPreviousRecord";

const AdjustmentForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest, true);
    const useFetch = useFetchHook();
    const fetchCatcher = useFetchCatcherHook();
    const productCategoryOptions = useOptionHook('/api/product_categories', 'product_category.category');
    const warehouseOptions = useOptionHook('/api/warehouses', 'warehouse.name');
    const productLineOptions = useOptionLineHook('/api/products', 'product.name');
    const measurementLineOptions = useOptionLineHook('/api/measurements', 'measurement.name');

    useEffect(() => {
        productCategoryOptions.getInitialOptions(formState);
        warehouseOptions.getInitialOptions(formState);
        productLineOptions.getInitialOptions(formState, 'adjustment_lines');
        measurementLineOptions.getInitialOptions(formState, 'adjustment_lines');
    }, [formState.initialLoad]);

    function onValuesChange(changedValues, allValues) {
        isLineFieldExecute(changedValues, allValues, 'adjustment_lines', 'product_id', getProductInfoAndSetValues);
    }

    function getProductInfoAndSetValues(line, allValues) {
        useFetch(`/api/products/${line.product_id}`, GET).then((response) => {
            const adjustmentLines = allValues.adjustment_lines;
            adjustmentLines[line.key] = {
                ...adjustmentLines[line.key],
                measurement_id: response.measurement_id,
                quantity_on_hand: response.quantity,
            };
            form.setFieldsValue({
                material_lines: adjustmentLines
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
                <StatusBar
                    statuses={[
                        {
                            value: 'draft',
                            title: 'Draft',
                            status: {draft: 'process', done: 'finish', cancelled: 'wait'}
                        },
                        {
                            value: 'done',
                            title: 'Done',
                            type: 'primary',
                            label: 'Validate',
                            status: {draft: 'wait', done: 'finish', cancelled: 'wait'},
                            visibility: {draft: 'visible', done: 'hidden', cancelled: 'hidden'},
                        },
                        {
                            value: 'cancelled',
                            title: 'Cancelled',
                            type: 'ghost',
                            label: 'Cancel',
                            status: {draft: 'wait', done: 'wait', cancelled: 'finish'},
                            visibility: {draft: 'visible', done: 'hidden', cancelled: 'hidden'},
                        },
                    ]}
                />
                <FormCard>
                    <RowForm>
                        <ColForm>
                            <FormItemStatus
                                name={'status'}
                            />

                            <FormItemText
                                label={'Number'}
                                name={'number'}
                                message={'Please input number'}
                                required={true}
                                size={'large'}
                            />

                            <FormItemSelect
                                label={'Product Category'}
                                name={'product_category_id'}
                                message={'Please select a product category'}
                                required={true}
                                {...productCategoryOptions}
                            />

                            <FormItemSelect
                                label={'Warehouse'}
                                name={'warehouse_id'}
                                message={'Please select a warehouse'}
                                required={true}
                                {...warehouseOptions}
                            />
                        </ColForm>
                    </RowForm>
                    <RowForm>
                        <ColForm lg={24}>
                            <FormLineParent
                                columns={['Product', 'Measurement', 'Quantity On Hand', 'Quantity Counted']}
                                listName={'adjustment_lines'}
                            >
                                <FormItemLineId name={'id'}/>
                                <FormItemSelect
                                    placeholder={'Product'}
                                    name={'product_id'}
                                    message={'Please select a product'}
                                    required={true}
                                    optionAggregate={productLineOptions}
                                />
                                <FormItemSelect
                                    placeholder={'Measurement'}
                                    name={'measurement_id'}
                                    message={'Please select a measurement'}
                                    required={true}
                                    optionAggregate={measurementLineOptions}
                                />
                                <FormItemNumber
                                    placeholder={'Quantity on hand'}
                                    name={'quantity_on_hand'}
                                    message={'Please input a quantity on hand'}
                                    required={true}
                                />
                                <FormItemNumber
                                    placeholder={'Quantity counted'}
                                    name={'quantity_counted'}
                                    message={'Please input a counted quantity'}
                                    required={true}
                                />
                            </FormLineParent>

                        </ColForm>
                    </RowForm>
                </FormCard>
            </CustomForm>
        </FormContextProvider>
    );
};


export default AdjustmentForm;
