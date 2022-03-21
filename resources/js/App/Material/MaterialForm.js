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
import FormItemSelect from "../../Components/FormItem/FormItemSelect";
import ControlPanel from "../../Components/ControlPanel";
import FormItemSelectAjax from "../../Components/FormItem/FormItemSelectAjax";
import FormCard from "../../Components/FormCard";
import {checkIfADynamicInputChangedAndDoSomething} from "../../Helpers/form";
import useFetchCatcherHook from "../../Hooks/useFetchCatcherHook";
import {GET, POST} from "../../consts";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import useFetchHook from "../../Hooks/useFetchHook";
import {FormContextProvider} from "../../Contexts/FormContext";
import AddLineButton from "../../Components/FormLines/AddLineButton";
import RemoveLineButton from "../../Components/FormLines/RemoveLineButton";
import LineColumn from "../../Components/FormLines/LineColumn";

const {TabPane} = Tabs;

const MaterialForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest, true);
    const [useFetch, fetchAbort] = useFetchHook();
    const fetchCatcher = useFetchCatcherHook();
    const [state, setState] = useState({
        materialLinesOptionReload: [],
        materialLinesDeleted: [],
    });

    useEffect(() => {
        return () => {
            fetchAbort();
        };
    }, []);

    function onValuesChange(changedValues, allValues) {
        checkIfADynamicInputChangedAndDoSomething(changedValues, allValues, 'material_lines', 'product_id', getProductDataAndFillDefaultValues);
    }

    function getProductDataAndFillDefaultValues(changeMaterialLine, materialLines) {
        useFetch(`/api/products`, GET, {
            id: changeMaterialLine.product_id
        }).then((response) => {
            const product = response.data[0];
            materialLines[changeMaterialLine.key] = {
                ...materialLines[changeMaterialLine.key],
                ...{
                    measurement_id: product.measurement_id,
                    isReload: product.measurement.name
                }
            };
            setMaterialLinesReload(materialLines);
        }).catch((responseErr) => {
            fetchCatcher.get(responseErr);
        });
    }

    function setMaterialLinesReload(materialLines) {
        setState((prevState) => ({
            ...prevState,
            materialLinesOptionReload: materialLines
        }));
        form.setFieldsValue({
            material_lines: materialLines
        });
    }

    function onFinish(values) {
        if (id) {
            if (state.materialLinesDeleted.length) {
                useFetch(`/api/material_lines/mass_destroy`, POST, {ids: state.materialLinesDeleted}).then(() => {
                    setState((prevState) => ({
                        ...prevState,
                        materialLinesDeleted: [],
                        materialLinesOptionReload: [],
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
                setState: setState,
                onFinish: onFinish,
                onValuesChange: onValuesChange
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
                            <FormItemSelectAjax
                                label={'Product'}
                                name={'product_id'}
                                message={'Please select a product'}
                                required={true}
                                url={'/api/products'}
                                query={'product.name'}
                            />

                            <FormItemSelectAjax
                                label={'Measurement'}
                                name={'measurement_id'}
                                message={'Please select a measurement'}
                                required={true}
                                url={'/api/measurements'}
                                query={'measurement.name'}
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

                                                            <FormItemSelectAjax
                                                                {...restField}
                                                                placeholder={'Product'}
                                                                name={'product_id'}
                                                                message={'Please select a product'}
                                                                required={true}
                                                                url={'/api/products'}
                                                                style={{display: 'inline-block', width: '33.33%'}}
                                                                query={`material_lines.${name}.product.name`}
                                                                groupName={name}
                                                                listName={'material_lines'}
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

                                                            <FormItemSelectAjax
                                                                {...restField}
                                                                placeholder={'Measurement'}
                                                                name={'measurement_id'}
                                                                message={'Please select a measurement'}
                                                                required={true}
                                                                url={'/api/measurements'}
                                                                search={state.materialLinesOptionReload[name] ? state.materialLinesOptionReload[name].isReload : null}
                                                                style={{display: 'inline-block', width: '33.33%'}}
                                                                query={`material_lines.${name}.measurement.name`}
                                                                groupName={name}
                                                                listName={'material_lines'}
                                                            />
                                                        </ColForm>

                                                        <RemoveLineButton
                                                            remove={remove}
                                                            dynamicName={'material_lines'}
                                                            name={name}
                                                        />
                                                    </RowForm>
                                                ))}
                                                <AddLineButton
                                                    add={add}
                                                    label={'Add a component'}
                                                />
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
