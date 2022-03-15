import React, {useEffect, useState} from 'react';
import {Form, Tabs} from "antd";
import {useParams} from "react-router-dom";
import useFormState from "../../Hooks/useFormState";
import manifest from "./__manifest__.json";
import FormButtons from "../../components/FormButtons/FormButtons";
import RowForm from "../../components/Grid/RowForm";
import ColForm from "../../components/Grid/ColForm";
import CustomForm from "../../components/CustomForm";
import FormItemText from "../../components/FormItem/FormItemText";
import FormItemNumber from "../../components/FormItem/FormItemNumber";
import FormItemSelect from "../../components/FormItem/FormItemSelect";
import ControlPanel from "../../components/ControlPanel";
import FormItemSelectAjax from "../../components/FormItem/FormItemSelectAjax";
import FormCard from "../../components/FormCard";
import {
    checkIfADynamicInputChangedAndDoSomething,
    DynamicFieldAddButton,
    DynamicFieldRemoveButton,
    GenerateDynamicColumns
} from "../../Helpers/form";
import useFetchHook from "../../Hooks/useFetchHook";
import useFetchCatcher from "../../Hooks/useFetchCatcher";
import {GET, POST} from "../../consts";

const {TabPane} = Tabs;

const MaterialForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormState(id, form, manifest, true);
    const [useFetch, fetchAbort] = useFetchHook();
    const fetchCatcher = useFetchCatcher();
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
        <CustomForm
            form={form}
            onFinish={onFinish}
            onValuesChange={onValuesChange}
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
                    <ColForm>
                        <FormItemSelectAjax
                            label={'Product'}
                            name={'product_id'}
                            message={'Please select a product'}
                            required={true}
                            url={'/api/products/option'}
                            {...formState}
                            query={'product.name'}
                        />

                        <FormItemNumber
                            label={'Quantity'}
                            name={'quantity'}
                            message={'Please input quantity'}
                            required={true}
                            {...formState}
                        />

                        <FormItemSelectAjax
                            label={'Measurement'}
                            name={'measurement_id'}
                            message={'Please select a measurement'}
                            required={true}
                            url={'/api/measurements/option'}
                            {...formState}
                            query={'measurement.name'}
                        />
                    </ColForm>

                    <ColForm>
                        <FormItemText
                            label={'Reference'}
                            name={'reference'}
                            {...formState}
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
                            {...formState}
                        />
                    </ColForm>
                </RowForm>


                <Tabs defaultActiveKey="1">
                    <TabPane tab="Components" key="1">
                        <GenerateDynamicColumns
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
                                                            form={form}
                                                            {...restField}
                                                            name={'id'}
                                                            {...formState}
                                                            style={{display: 'hidden', position: 'absolute'}}
                                                            groupName={name}
                                                            listName={'material_lines'}
                                                        />

                                                        <FormItemSelectAjax
                                                            form={form}
                                                            {...restField}
                                                            placeholder={'Product'}
                                                            name={'product_id'}
                                                            message={'Please select a product'}
                                                            required={true}
                                                            url={'/api/products/option'}
                                                            {...formState}
                                                            style={{display: 'inline-block', width: '33.33%'}}
                                                            query={`material_lines.${name}.product.name`}
                                                            groupName={name}
                                                            listName={'material_lines'}
                                                        />

                                                        <FormItemNumber
                                                            form={form}
                                                            {...restField}
                                                            placeholder={'Quantity'}
                                                            name={'quantity'}
                                                            message={'Please input a quantity'}
                                                            required={true}
                                                            {...formState}
                                                            style={{display: 'inline-block', width: '33.33%'}}
                                                            groupName={name}
                                                            listName={'material_lines'}
                                                        />

                                                        <FormItemSelectAjax
                                                            form={form}
                                                            {...restField}
                                                            placeholder={'Measurement'}
                                                            name={'measurement_id'}
                                                            message={'Please select a measurement'}
                                                            required={true}
                                                            url={'/api/measurements/option'}
                                                            search={state.materialLinesOptionReload[name] ? state.materialLinesOptionReload[name].isReload : null}
                                                            {...formState}
                                                            style={{display: 'inline-block', width: '33.33%'}}
                                                            query={`material_lines.${name}.measurement.name`}
                                                            groupName={name}
                                                            listName={'material_lines'}
                                                        />
                                                    </ColForm>

                                                    <DynamicFieldRemoveButton
                                                        remove={remove}
                                                        form={form}
                                                        dynamicName={'material_lines'}
                                                        name={name}
                                                        formState={formState}
                                                        setState={setState}
                                                    />
                                                </RowForm>
                                            ))}
                                            <DynamicFieldAddButton
                                                formState={formState}
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
                            {/*<ColForm>*/}
                            {/*    <FormItemText*/}
                            {/*        form={form}*/}
                            {/*        label={'Tracking Reference'}*/}
                            {/*        name={'tracking_reference'}*/}
                            {/*        {...formState}*/}
                            {/*    />*/}
                            {/*</ColForm>*/}

                            {/*<ColForm>*/}
                            {/*    <FormItemSelect*/}
                            {/*        form={form}*/}
                            {/*        label={'Shipping Policy'}*/}
                            {/*        name={'shipping_policy'}*/}
                            {/*        message={'Please select an address type'}*/}
                            {/*        required={true}*/}
                            {/*        options={[*/}
                            {/*            {value: 'as_soon_as_possible', label: 'As soon as possible'},*/}
                            {/*            {value: 'when_all_products_are_ready', label: 'When all products are ready'},*/}
                            {/*        ]}*/}
                            {/*        {...formState}*/}
                            {/*    />*/}

                            {/*    <FormItemSelectAjax*/}
                            {/*        form={form}*/}
                            {/*        label={'Responsible'}*/}
                            {/*        name={'responsible_id'}*/}
                            {/*        url={'/api/users/option'}*/}
                            {/*        {...formState}*/}
                            {/*        query={'responsible.name'}*/}
                            {/*    />*/}
                            {/*</ColForm>*/}
                        </RowForm>
                    </TabPane>
                </Tabs>

            </FormCard>
        </CustomForm>
    );
};


export default MaterialForm;
