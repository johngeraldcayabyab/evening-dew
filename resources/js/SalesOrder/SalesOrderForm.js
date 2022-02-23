import React, {useEffect, useState} from 'react';
import {Button, Form, Input} from "antd";
import {useParams} from "react-router-dom";
import useFormState from "../Hooks/useFormState";
import manifest from "./__manifest__.json";
import FormButtons from "../components/FormButtons/FormButtons";
import RowForm from "../components/Grid/RowForm";
import ColForm from "../components/Grid/ColForm";
import CustomForm from "../components/CustomForm";
import ControlPanel from "../components/ControlPanel";
import FormCard from "../components/FormCard";
import FormItemText from "../components/FormItem/FormItemText";
import FormItemSelectAjax from "../components/FormItem/FormItemSelectAjax";
import useFetchHook from "../Hooks/useFetchHook";
import useFetchCatcher from "../Hooks/useFetchCatcher";
import {GET, POST} from "../consts";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import FormItemNumber from "../components/FormItem/FormItemNumber";

const SalesOrderForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormState(id, form, manifest, true);
    const [useFetch, fetchAbort] = useFetchHook();
    const fetchCatcher = useFetchCatcher();
    const [state, setState] = useState({
        invoiceAddressOptionReload: false,
        deliveryAddressOptionReload: false,
        salesOrderLinesOptionReload: [],
        deletedSalesOrderLines: []
    });

    useEffect(() => {
        return () => {
            fetchAbort();
        };
    }, []);


    return (
        <CustomForm
            form={form}
            onFinish={(values) => {
                formActions.onFinish(values);
                if (id) {
                    if (state.deletedSalesOrderLines.length) {
                        const deleteSalesOrderLinesIds = state.deletedSalesOrderLines.map((deletedSalesOrderLine) => {
                            if (deletedSalesOrderLine) {
                                return deletedSalesOrderLine.id;
                            }
                        });
                        if (!deleteSalesOrderLinesIds.some(item => !item)) {
                            useFetch(`/api/sales_order_lines/mass_destroy`, POST, {ids: deleteSalesOrderLinesIds}).then(() => {
                                setState((prevState) => ({
                                    ...prevState,
                                    deletedSalesOrderLines: [],
                                }));
                            }).catch((responseErr) => {
                                fetchCatcher.get(responseErr);
                            });
                        }
                    }
                }
            }}
            onValuesChange={(changedValues, allValues) => {
                console.log(changedValues);
                if (changedValues.customer_id) {
                    useFetch(`/api/addresses`, GET, {
                        contact_id: changedValues.customer_id
                    }).then((response) => {
                        let defaultAddress = response.data.find((address) => (address.type === 'default'));
                        let invoiceAddress = response.data.find((address) => (address.type === 'invoice'));
                        let deliveryAddress = response.data.find((address) => (address.type === 'delivery'));
                        invoiceAddress = invoiceAddress ? invoiceAddress : defaultAddress;
                        deliveryAddress = deliveryAddress ? deliveryAddress : defaultAddress;
                        setState((prevState) => ({
                            ...prevState,
                            invoiceAddressOptionReload: invoiceAddress.address_name,
                            deliveryAddressOptionReload: deliveryAddress.address_name,
                        }));
                        form.setFieldsValue({
                            invoice_address_id: invoiceAddress.id,
                            delivery_address_id: deliveryAddress.id
                        });
                    }).catch((responseErr) => {
                        fetchCatcher.get(responseErr);
                    });
                }
                if (changedValues.sales_order_lines && !changedValues.sales_order_lines.some(item => item === undefined || item.id)) {
                    const salesOrderLines = allValues.sales_order_lines;
                    let changedSalesOrderLine = false;
                    changedValues.sales_order_lines.forEach((salesOrderLine, key) => {
                        if (salesOrderLine && salesOrderLine.product_id) {
                            changedSalesOrderLine = {
                                key: key,
                                product_id: salesOrderLine.product_id
                            };
                        }
                    });
                    if (changedSalesOrderLine) {
                        useFetch(`/api/products`, GET, {
                            id: changedSalesOrderLine.product_id
                        }).then((response) => {
                            const product = response.data[0];
                            salesOrderLines[changedSalesOrderLine.key] = {
                                ...salesOrderLines[changedSalesOrderLine.key],
                                ...{
                                    description: product.sales_description,
                                    measurement_id: product.sales_measurement_id,
                                    unit_price: product.sales_price,
                                    isReload: product.sales_measurement.name
                                }
                            };
                            setState((prevState) => ({
                                ...prevState,
                                salesOrderLinesOptionReload: salesOrderLines
                            }));
                            form.setFieldsValue({
                                sales_order_lines: salesOrderLines
                            });
                        }).catch((responseErr) => {
                            fetchCatcher.get(responseErr);
                        });
                    }
                }
            }}
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
                        <FormItemText
                            label={'Number'}
                            name={'number'}
                            message={'Please input number'}
                            required={true}
                            size={'large'}
                            {...formState}
                        />
                    </ColForm>
                </RowForm>

                <RowForm>
                    <ColForm>
                        <FormItemSelectAjax
                            label={'Customer'}
                            name={'customer_id'}
                            message={'Please select a customer'}
                            required={true}
                            url={'/api/contacts/option'}
                            {...formState}
                        />
                        <FormItemSelectAjax
                            label={'Invoice address'}
                            name={'invoice_address_id'}
                            message={'Please select a invoice address'}
                            required={true}
                            url={'/api/addresses/option'}
                            search={state.invoiceAddressOptionReload}
                            {...formState}
                            query={'invoice_address.address_name'}
                        />
                        <FormItemSelectAjax
                            label={'Delivery address'}
                            name={'delivery_address_id'}
                            message={'Please select a delivery address'}
                            required={true}
                            url={'/api/addresses/option'}
                            search={state.deliveryAddressOptionReload}
                            {...formState}
                            query={'delivery_address.address_name'}
                        />
                    </ColForm>
                    <ColForm>
                        <FormItemSelectAjax
                            label={'Payment Term'}
                            name={'payment_term_id'}
                            url={'/api/payment_terms/option'}
                            {...formState}
                        />
                    </ColForm>
                </RowForm>

                <RowForm>
                    <ColForm lg={24}>
                        <Form.List name="sales_order_lines">
                            {(fields, {add, remove}) => (
                                <>
                                    {fields.map(({key, name, ...restField}) => (
                                        <RowForm key={key}>
                                            <ColForm lg={23}>
                                                <FormItemSelectAjax
                                                    {...restField}
                                                    placeholder={'Product'}
                                                    name={'product_id'}
                                                    message={'Please select a product'}
                                                    required={true}
                                                    url={'/api/products/option'}
                                                    {...formState}
                                                    style={{display: 'inline-block', width: '20%'}}
                                                    query={'product.name'}
                                                    groupName={name}
                                                    listName={'sales_order_lines'}
                                                />

                                                <FormItemText
                                                    {...restField}
                                                    placeholder={'Description'}
                                                    name={'description'}
                                                    {...formState}
                                                    style={{display: 'inline-block', width: '20%'}}
                                                    groupName={name}
                                                    listName={'sales_order_lines'}
                                                />

                                                <FormItemNumber
                                                    {...restField}
                                                    placeholder={'Quantity'}
                                                    name={'quantity'}
                                                    message={'Please input a quantity'}
                                                    required={true}
                                                    {...formState}
                                                    style={{display: 'inline-block', width: '20%'}}
                                                    groupName={name}
                                                    listName={'sales_order_lines'}
                                                />

                                                <FormItemSelectAjax
                                                    {...restField}
                                                    placeholder={'Measurement'}
                                                    name={'measurement_id'}
                                                    message={'Please select a measurement'}
                                                    required={true}
                                                    url={'/api/measurements/option'}
                                                    search={state.salesOrderLinesOptionReload[key] ? state.salesOrderLinesOptionReload[key].isReload : null}
                                                    {...formState}
                                                    style={{display: 'inline-block', width: '20%'}}
                                                    query={'measurement.name'}
                                                    groupName={name}
                                                    listName={'sales_order_lines'}
                                                />

                                                <FormItemNumber
                                                    {...restField}
                                                    placeholder={'Unit Price'}
                                                    name={'unit_price'}
                                                    message={'Please input a unit price'}
                                                    required={true}
                                                    {...formState}
                                                    style={{display: 'inline-block', width: '20%'}}
                                                    groupName={name}
                                                    listName={'sales_order_lines'}
                                                />
                                            </ColForm>
                                            <ColForm lg={1}>
                                                {!formState.formDisabled &&
                                                <MinusCircleOutlined onClick={(item) => {
                                                    remove(name);
                                                    const deletedSalesOrderLines = state.deletedSalesOrderLines;
                                                    deletedSalesOrderLines.push(formState.initialValues.sales_order_lines[restField.fieldKey]);
                                                    setState((prevState) => ({
                                                        ...prevState,
                                                        deletedSalesOrderLines: deletedSalesOrderLines,
                                                    }));
                                                }}/>}
                                            </ColForm>
                                        </RowForm>
                                    ))}
                                    <Form.Item>
                                        {!formState.formDisabled &&
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                            Add field
                                        </Button>}
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </ColForm>
                </RowForm>
            </FormCard>
        </CustomForm>
    );
};

export default SalesOrderForm;
