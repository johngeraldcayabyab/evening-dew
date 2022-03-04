import React, {useEffect, useState} from 'react';
import {Button, Divider, Form, Row, Space, Tabs} from "antd";
import {Link, useParams} from "react-router-dom";
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
import FormItemNumber from "../components/FormItem/FormItemNumber";
import {
    checkIfADynamicInputChangedAndDoSomething,
    DynamicFieldAddButton,
    DynamicFieldRemoveButton,
    GenerateDynamicColumns
} from "../Helpers/form";
import FormItemDate from "../components/FormItem/FormItemDate";
import FormItemSelect from "../components/FormItem/FormItemSelect";
import StatusBar from "../components/StatusBar";
import FormItemStatus from "../components/FormItem/FormItemStatus";

const {TabPane} = Tabs;

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
        salesOrderLinesDeleted: [],
    });

    useEffect(() => {
        return () => {
            fetchAbort();
        };
    }, []);

    function onValuesChange(changedValues, allValues) {
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
        checkIfADynamicInputChangedAndDoSomething(changedValues, allValues, 'sales_order_lines', 'product_id', getProductDataAndFillDefaultValues);
    }

    function getProductDataAndFillDefaultValues(changedSalesOrderLine, salesOrderLines) {
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
            setSalesOrderLinesReload(salesOrderLines);
        }).catch((responseErr) => {
            fetchCatcher.get(responseErr);
        });
    }

    function setSalesOrderLinesReload(salesOrderLines) {
        setState((prevState) => ({
            ...prevState,
            salesOrderLinesOptionReload: salesOrderLines
        }));
        form.setFieldsValue({
            sales_order_lines: salesOrderLines
        });
    }

    function onFinish(values) {
        if (id) {
            if (state.salesOrderLinesDeleted.length) {
                useFetch(`/api/sales_order_lines/mass_destroy`, POST, {ids: state.salesOrderLinesDeleted}).then(() => {
                    setState((prevState) => ({
                        ...prevState,
                        salesOrderLinesDeleted: [],
                        salesOrderLinesOptionReload: [],
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
            <StatusBar
                id={id}
                form={form}
                formState={formState}
                formActions={formActions}
                manifest={manifest}
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
            <FormCard {...formState}>
                <div style={{
                    borderBottom: '1px solid #cccccc',
                    paddingBottom: '11px',
                    marginBottom: '10px'
                }}>
                    <RowForm align={'right'}>
                        <ColForm lg={24} style={{textAlign: 'right'}}>
                            <Link to={`/sales_order_transfers`}>
                                <Button
                                    htmlType={"button"}
                                    type={"ghost"}
                                    size={'default'}
                                >
                                    Deliveries
                                </Button>
                            </Link>
                        </ColForm>
                    </RowForm>
                </div>


                <RowForm>
                    <ColForm>
                        <FormItemStatus
                            form={form}
                            name={'status'}
                            {...formState}
                        />

                        <FormItemText
                            form={form}
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
                            form={form}
                            label={'Customer'}
                            name={'customer_id'}
                            message={'Please select a customer'}
                            required={true}
                            url={'/api/contacts/option'}
                            {...formState}
                            query={'customer.name'}
                        />
                        <FormItemSelectAjax
                            form={form}
                            label={'Invoice address'}
                            name={'invoice_address_id'}
                            message={'Please select a invoice address'}
                            required={true}
                            url={'/api/addresses/option'}
                            {...formState}
                            search={state.invoiceAddressOptionReload}
                            query={'invoice_address.address_name'}
                        />
                        <FormItemSelectAjax
                            form={form}
                            label={'Delivery address'}
                            name={'delivery_address_id'}
                            message={'Please select a delivery address'}
                            required={true}
                            url={'/api/addresses/option'}
                            {...formState}
                            search={state.deliveryAddressOptionReload}
                            query={'delivery_address.address_name'}
                        />
                    </ColForm>
                    <ColForm>
                        <FormItemDate
                            form={form}
                            label={'Expiration Date'}
                            name={'expiration_date'}
                            {...formState}
                        />

                        <FormItemDate
                            form={form}
                            label={'Quotation Date'}
                            name={'quotation_date'}
                            {...formState}
                        />

                        <FormItemSelectAjax
                            form={form}
                            label={'Payment Term'}
                            name={'payment_term_id'}
                            url={'/api/payment_terms/option'}
                            {...formState}
                            query={'payment_term.name'}
                        />
                    </ColForm>
                </RowForm>

                <Tabs defaultActiveKey="1">
                    <TabPane tab="Order Lines" key="1">
                        <GenerateDynamicColumns
                            columns={['Product', 'Description', 'Quantity', 'Measurement', 'Unit Price']}
                        />
                        <RowForm>
                            <ColForm lg={24}>
                                <Form.List name="sales_order_lines">
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
                                                            listName={'sales_order_lines'}
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
                                                            style={{display: 'inline-block', width: '20%'}}
                                                            query={`sales_order_lines.${name}.product.name`}
                                                            groupName={name}
                                                            listName={'sales_order_lines'}
                                                        />

                                                        <FormItemText
                                                            form={form}
                                                            {...restField}
                                                            placeholder={'Description'}
                                                            name={'description'}
                                                            {...formState}
                                                            style={{display: 'inline-block', width: '20%'}}
                                                            groupName={name}
                                                            listName={'sales_order_lines'}
                                                        />

                                                        <FormItemNumber
                                                            form={form}
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
                                                            form={form}
                                                            {...restField}
                                                            placeholder={'Measurement'}
                                                            name={'measurement_id'}
                                                            message={'Please select a measurement'}
                                                            required={true}
                                                            url={'/api/measurements/option'}
                                                            search={state.salesOrderLinesOptionReload[name] ? state.salesOrderLinesOptionReload[name].isReload : null}
                                                            {...formState}
                                                            style={{display: 'inline-block', width: '20%'}}
                                                            query={`sales_order_lines.${name}.measurement.name`}
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

                                                    <DynamicFieldRemoveButton
                                                        remove={remove}
                                                        form={form}
                                                        dynamicName={'sales_order_lines'}
                                                        name={name}
                                                        formState={formState}
                                                        setState={setState}
                                                    />
                                                </RowForm>
                                            ))}

                                            <DynamicFieldAddButton
                                                formState={formState}
                                                add={add}
                                                label={'Add a product'}
                                            />
                                        </>
                                    )}
                                </Form.List>
                            </ColForm>
                        </RowForm>
                    </TabPane>
                    <TabPane tab="Other Information" key="2">
                        <RowForm>
                            <ColForm>
                                <Divider orientation={'left'}>
                                    Sales
                                </Divider>
                                <FormItemSelectAjax
                                    form={form}
                                    label={'Salesperson'}
                                    name={'salesperson_id'}
                                    message={'Please select a salesperson'}
                                    required={true}
                                    url={'/api/users/option'}
                                    {...formState}
                                    query={'salesperson.name'}
                                />

                                <FormItemText
                                    form={form}
                                    label={'Customer Reference'}
                                    name={'customer_reference'}
                                    {...formState}
                                />
                            </ColForm>
                            <ColForm>
                                <Divider orientation={'left'}>
                                    Invoicing
                                </Divider>
                            </ColForm>
                        </RowForm>


                        <RowForm>
                            <ColForm>
                                <Divider orientation={'left'}>
                                    Delivery
                                </Divider>
                                <FormItemSelect
                                    form={form}
                                    label={'Shipping Policy'}
                                    name={'shipping_policy'}
                                    message={'Please select an shipping policy'}
                                    required={true}
                                    options={[
                                        {value: 'as_soon_as_possible', label: 'As soon as possible'},
                                        {value: 'when_all_products_are_ready', label: 'When all products are ready'},
                                    ]}
                                    {...formState}
                                />
                                <FormItemDate
                                    form={form}
                                    label={'Expected delivery date'}
                                    name={'expected_delivery_date'}
                                    {...formState}
                                />
                            </ColForm>
                            <ColForm>
                                <Divider orientation={'left'}>
                                    Tracking
                                </Divider>
                                <FormItemText
                                    form={form}
                                    label={'Source document'}
                                    name={'source_document'}
                                    {...formState}
                                />
                            </ColForm>
                        </RowForm>

                    </TabPane>
                </Tabs>
            </FormCard>
        </CustomForm>
    );
};

export default SalesOrderForm;
