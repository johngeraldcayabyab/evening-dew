import React, {useEffect, useState} from 'react';
import {Form, Tabs} from "antd";
import {useParams} from "react-router-dom";
import useFormHook from "../../Hooks/useFormHook";
import manifest from "./__manifest__.json";
import FormButtons from "../../Components/FormButtons/FormButtons";
import RowForm from "../../Components/Grid/RowForm";
import ColForm from "../../Components/Grid/ColForm";
import CustomForm from "../../Components/CustomForm";
import FormItemText from "../../Components/FormItem/FormItemText";
import FormItemNumber from "../../Components/FormItem/FormItemNumber";
import FormItemSelectTest from "../../Components/FormItem/FormItemSelectTest";
import ControlPanel from "../../Components/ControlPanel";
import FormCard from "../../Components/FormCard";
import {getPersistedKey, isLineFieldExecute} from "../../Helpers/form";
import useFetchCatcherHook from "../../Hooks/useFetchCatcherHook";
import {GET, POST} from "../../consts";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import useFetchHook from "../../Hooks/useFetchHook";
import {FormContextProvider} from "../../Contexts/FormContext";
import AddLineButton from "../../Components/FormLines/AddLineButton";
import RemoveLineButton from "../../Components/FormLines/RemoveLineButton";
import LineColumn from "../../Components/FormLines/LineColumn";
import useOptionHook from "../../Hooks/useOptionHook";
import FormItemSelectTest from "../../Components/FormItem/FormItemSelectTest";
import useOptionLineHook from "../../Hooks/useOptionLineHook";

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
    const [state, setState] = useState({
        materialLinesDeleted: [],
    });

    useEffect(() => {
        productOptions.getInitialOptions(formState);
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

    function onFinish(values) {
        if (id) {
            if (state.materialLinesDeleted.length) {
                useFetch(`/api/material_lines/mass_destroy`, POST, {ids: state.materialLinesDeleted}).then(() => {
                    setState((prevState) => ({
                        ...prevState,
                        materialLinesDeleted: [],
                    }));
                }).catch((responseErr) => {
                    fetchCatcher.get(responseErr);
                });
            }
        }
        formActions.onFinish(values);
    }

    return (
        <FormContextProvider
            value={{
                id: id,
                manifest: manifest,
                form: form,
                formState: formState,
                formActions: formActions,
                state: state,
                setState: setState,
                onFinish: onFinish,
                onValuesChange: onValuesChange,
            }}
        >
            <CustomForm>
                <ControlPanel
                    topColOneLeft={<CustomBreadcrumb/>}
                    bottomColOneLeft={<FormButtons/>}
                />
                <FormCard>
                    <RowForm>
                        <ColForm>
                            <FormItemSelectTest
                                label={'Product'}
                                name={'product_id'}
                                message={'Please select a product'}
                                required={true}
                                {...productOptions}
                            />

                            <FormItemSelectTest
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

                            <FormItemSelectTest
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
                            <LineColumn
                                columns={['Product', 'Quantity', 'Measurement']}
                            />
                            <RowForm>
                                <ColForm lg={24}>
                                    <Form.List name="material_lines">
                                        {(fields, {add, remove}) => (
                                            <>
                                                {fields.map(({key, name, ...restField}) => (
                                                    <RowForm key={key}>
                                                        <ColForm lg={23}>
                                                            <FormItemNumber
                                                                {...restField}
                                                                name={'id'}
                                                                style={{display: 'hidden', position: 'absolute'}}
                                                                groupName={name}
                                                                listName={'material_lines'}
                                                            />

                                                            <FormItemSelectTest
                                                                {...restField}
                                                                placeholder={'Product'}
                                                                name={'product_id'}
                                                                message={'Please select a product'}
                                                                required={true}
                                                                style={{display: 'inline-block', width: '33.33%'}}
                                                                groupName={name}
                                                                listName={'material_lines'}
                                                                {...productLineOptions.aggregate(productLineOptions, restField.fieldKey)}
                                                            />

                                                            <FormItemNumber
                                                                {...restField}
                                                                placeholder={'Quantity'}
                                                                name={'quantity'}
                                                                message={'Please input a quantity'}
                                                                required={true}
                                                                style={{display: 'inline-block', width: '33.33%'}}
                                                                groupName={name}
                                                                listName={'material_lines'}
                                                            />

                                                            <FormItemSelectTest
                                                                {...restField}
                                                                placeholder={'Measurement'}
                                                                name={'measurement_id'}
                                                                message={'Please select a measurement'}
                                                                required={true}
                                                                style={{display: 'inline-block', width: '33.33%'}}
                                                                groupName={name}
                                                                listName={'material_lines'}
                                                                {...measurementLineOptions.aggregate(measurementLineOptions, restField.fieldKey)}
                                                            />
                                                        </ColForm>
                                                        <RemoveLineButton
                                                            remove={remove}
                                                            listName={'material_lines'}
                                                            name={name}
                                                        />
                                                    </RowForm>
                                                ))}
                                                <AddLineButton add={add} label={'Add a component'}/>
                                            </>
                                        )}
                                    </Form.List>
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
