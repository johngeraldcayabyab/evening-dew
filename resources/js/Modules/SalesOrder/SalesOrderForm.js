import React, {useEffect, useState} from 'react';
import {Divider, Form, Table, Tabs} from "antd";
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
import useFetchCatcherHook from "../../Hooks/useFetchCatcherHook";
import {GET, POST} from "../../consts";
import FormItemNumber from "../../Components/FormItem/FormItemNumber";
import {getPersistedKey, isLineFieldExecute} from "../../Helpers/form";
import FormItemDate from "../../Components/FormItem/FormItemDate";
import StatusBar from "../../Components/StatusBar";
import FormItemStatus from "../../Components/FormItem/FormItemStatus";
import FormLinks from "../../Components/FormLinks";
import FormLabel from "../../Components/Typography/FormLabel";
import {objectHasValue} from "../../Helpers/object";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import useFetchHook from "../../Hooks/useFetchHook";
import {FormContextProvider} from "../../Contexts/FormContext";
import RemoveLineButton from "../../Components/FormLines/RemoveLineButton";
import AddLineButton from "../../Components/FormLines/AddLineButton";
import LineColumn from "../../Components/FormLines/LineColumn";
import FormItemSelectTest from "../../Components/FormItem/FormItemSelectTest";
import useOptionHook from "../../Hooks/useOptionHook";
import useOptionLineHook from "../../Hooks/useOptionLineHook";
import FormItemLineId from "../../Components/FormItem/FormItemLineId";

const {TabPane} = Tabs;

const SalesOrderForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest, true);
    const customerOptions = useOptionHook('/api/contacts', 'customer.name');
    const invoiceAddressOptions = useOptionHook('/api/addresses', 'invoice_address.address_name');
    const deliveryAddressOptions = useOptionHook('/api/addresses', 'delivery_address.address_name');
    const paymentTermOptions = useOptionHook('/api/payment_terms', 'payment_term.name');
    const salespersonOption = useOptionHook('/api/users', 'responsible.name');
    const productLineOptions = useOptionLineHook('/api/products', 'product.name');
    const salesMeasurementOptions = useOptionLineHook('/api/measurements', 'measurement.name');

    const useFetch = useFetchHook();
    const fetchCatcher = useFetchCatcherHook();
    const [state, setState] = useState({
        salesOrderLinesDeleted: [],
        breakdown: {
            untaxedAmount: 0,
            tax: 0,
            total: 0,
        }
    });

    useEffect(() => {
        if (objectHasValue(formState.initialValues)) {
            if (formState.initialValues.hasOwnProperty('sales_order_lines') && formState.initialValues.sales_order_lines.length) {
                const total = computeTotal(formState.initialValues.sales_order_lines);
                setState((prevState) => ({
                    ...prevState,
                    breakdown: {
                        untaxedAmount: total,
                        tax: 0,
                        total: total,
                    }
                }));
            }
        }
        customerOptions.getInitialOptions(formState);
        invoiceAddressOptions.getInitialOptions(formState);
        deliveryAddressOptions.getInitialOptions(formState);
        paymentTermOptions.getInitialOptions(formState);
        salespersonOption.getInitialOptions(formState);
        productLineOptions.getInitialOptions(formState, 'sales_order_lines');
        salesMeasurementOptions.getInitialOptions(formState, 'sales_order_lines');
    }, [formState.initialValues]);

    function onValuesChange(changedValues, allValues) {
        setDefaultValuesFromCustomer(changedValues);
        isLineFieldExecute(changedValues, allValues, 'sales_order_lines', 'product_id', getProductInfoAndSetValues);
        isLineFieldExecute(changedValues, allValues, 'sales_order_lines', 'quantity', computeSubtotal);
        isLineFieldExecute(changedValues, allValues, 'sales_order_lines', 'unit_price', computeSubtotal);
    }

    function setDefaultValuesFromCustomer(changedValues) {
        if (changedValues.customer_id) {
            useFetch(`/api/addresses`, GET, {
                contact_id: changedValues.customer_id
            }).then((response) => {
                const data = response.data;
                let defaultAddress = data.find((address) => (address.type === 'default'));
                let invoiceAddress = data.find((address) => (address.type === 'invoice'));
                let deliveryAddress = data.find((address) => (address.type === 'delivery'));
                invoiceAddress = invoiceAddress ? invoiceAddress : defaultAddress;
                deliveryAddress = deliveryAddress ? deliveryAddress : defaultAddress;
                invoiceAddressOptions.getOptions({id: invoiceAddress.id});
                deliveryAddressOptions.getOptions({id: deliveryAddress.id});
                form.setFieldsValue({
                    invoice_address_id: invoiceAddress.id,
                    delivery_address_id: deliveryAddress.id
                });
            }).catch((responseErr) => {
                fetchCatcher.get(responseErr);
            });
        }
    }

    function getProductInfoAndSetValues(line, allValues) {
        useFetch(`/api/products/${line.product_id}`, GET).then((response) => {
            const salesOrderLines = allValues.sales_order_lines;
            salesOrderLines[line.key] = {
                ...salesOrderLines[line.key],
                measurement_id: response.sales_measurement_id,
                unit_price: response.sales_price,
            };
            form.setFieldsValue({
                sales_order_lines: salesOrderLines
            });
            const persistedKey = getPersistedKey(line, salesMeasurementOptions.options)
            salesMeasurementOptions.getOptions(response.sales_measurement.name, persistedKey);
        }).catch((responseErr) => {
            fetchCatcher.get(responseErr);
        });
    }

    function computeSubtotal(changedSalesOrderLine, allValues) {
        const salesOrderLines = allValues.sales_order_lines;
        let salesOrderLine = salesOrderLines[changedSalesOrderLine.key];
        if (changedSalesOrderLine.hasOwnProperty('unit_price')) {
            salesOrderLine.subtotal = salesOrderLine.quantity * changedSalesOrderLine.unit_price;
        } else if (changedSalesOrderLine.hasOwnProperty('quantity')) {
            salesOrderLine.subtotal = changedSalesOrderLine.quantity * salesOrderLine.unit_price;
        }
        salesOrderLines[changedSalesOrderLine.key] = salesOrderLine;
        form.setFieldsValue({
            sales_order_lines: salesOrderLines
        });
        const total = computeTotal(salesOrderLines);
        setState((prevState) => ({
            ...prevState,
            breakdown: {
                untaxedAmount: total,
                tax: 0,
                total: total,
            }
        }));
    }

    function computeTotal(salesOrderLines) {
        return salesOrderLines.map((salesOrderLine) => (salesOrderLine.subtotal)).reduce((total, subtotal) => (total + subtotal));
    }

    function onFinish(values) {
        if (id) {
            if (state.salesOrderLinesDeleted.length) {
                useFetch(`/api/sales_order_lines/mass_destroy`, POST, {ids: state.salesOrderLinesDeleted}).then(() => {
                    setState((prevState) => ({
                        ...prevState,
                        salesOrderLinesDeleted: [],
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
                    <FormLinks
                        links={[
                            {
                                module: 'transfers',
                                param: 'source_document',
                                value: 'number',
                                label: 'Deliveries',
                            },
                        ]}
                    />
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
                        </ColForm>
                    </RowForm>

                    <RowForm>
                        <ColForm>
                            <FormItemSelectTest
                                label={'Customer'}
                                name={'customer_id'}
                                message={'Please select a customer'}
                                required={true}
                                {...customerOptions}
                            />
                            <FormItemSelectTest
                                label={'Invoice address'}
                                name={'invoice_address_id'}
                                message={'Please select a invoice address'}
                                required={true}
                                {...invoiceAddressOptions}
                            />
                            <FormItemSelectTest
                                label={'Delivery address'}
                                name={'delivery_address_id'}
                                message={'Please select a delivery address'}
                                required={true}
                                {...deliveryAddressOptions}
                            />
                        </ColForm>
                        <ColForm>
                            <FormItemDate
                                label={'Expiration Date'}
                                name={'expiration_date'}
                            />

                            <FormItemDate
                                label={'Quotation Date'}
                                name={'quotation_date'}
                            />

                            <FormItemSelectTest
                                label={'Payment Term'}
                                name={'payment_term_id'}
                                {...paymentTermOptions}
                            />
                        </ColForm>
                    </RowForm>

                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Order Lines" key="1">
                            <LineColumn
                                columns={['Product', 'Description', 'Quantity', 'Measurement', 'Unit Price', 'Subtotal']}
                            />
                            <RowForm>
                                <ColForm lg={24}>
                                    <Form.List name="sales_order_lines">
                                        {(fields, {add, remove}) => (
                                            <>
                                                {fields.map(({key, name, ...restField}) => (
                                                    <RowForm key={key}>
                                                        <ColForm lg={23}>
                                                            <FormItemLineId
                                                                {...restField}
                                                                name={'id'}
                                                                groupName={name}
                                                                listName={'sales_order_lines'}
                                                            />
                                                            <FormItemSelectTest
                                                                {...restField}
                                                                placeholder={'Product'}
                                                                name={'product_id'}
                                                                message={'Please select a product'}
                                                                required={true}
                                                                style={{display: 'inline-block', width: `${100 / 6}%`}}
                                                                groupName={name}
                                                                listName={'sales_order_lines'}
                                                                {...productLineOptions.aggregate(productLineOptions, restField.fieldKey)}
                                                            />
                                                            <FormItemText
                                                                {...restField}
                                                                placeholder={'Description'}
                                                                name={'description'}
                                                                style={{display: 'inline-block', width: `${100 / 6}%`}}
                                                                groupName={name}
                                                                listName={'sales_order_lines'}
                                                            />
                                                            <FormItemNumber
                                                                {...restField}
                                                                placeholder={'Quantity'}
                                                                name={'quantity'}
                                                                message={'Please input a quantity'}
                                                                required={true}
                                                                style={{display: 'inline-block', width: `${100 / 6}%`}}
                                                                groupName={name}
                                                                listName={'sales_order_lines'}
                                                            />
                                                            <FormItemSelectTest
                                                                {...restField}
                                                                placeholder={'Measurement'}
                                                                name={'measurement_id'}
                                                                message={'Please select a measurement'}
                                                                required={true}
                                                                style={{display: 'inline-block', width: `${100 / 6}%`}}
                                                                groupName={name}
                                                                listName={'sales_order_lines'}
                                                                {...salesMeasurementOptions.aggregate(salesMeasurementOptions, restField.fieldKey)}
                                                            />
                                                            <FormItemNumber
                                                                {...restField}
                                                                placeholder={'Unit Price'}
                                                                name={'unit_price'}
                                                                message={'Please input a unit price'}
                                                                required={true}
                                                                style={{display: 'inline-block', width: `${100 / 6}%`}}
                                                                groupName={name}
                                                                listName={'sales_order_lines'}
                                                            />
                                                            <FormItemNumber
                                                                overrideDisabled={true}
                                                                {...restField}
                                                                placeholder={'Subtotal'}
                                                                name={'subtotal'}
                                                                style={{display: 'inline-block', width: `${100 / 6}%`}}
                                                                groupName={name}
                                                                listName={'sales_order_lines'}
                                                            />
                                                        </ColForm>
                                                        <RemoveLineButton
                                                            remove={remove}
                                                            listName={'sales_order_lines'}
                                                            name={name}
                                                        />
                                                    </RowForm>
                                                ))}
                                                <AddLineButton add={add} label={'Add a product'}/>
                                            </>
                                        )}
                                    </Form.List>
                                </ColForm>
                            </RowForm>

                            <Divider/>

                            <RowForm>
                                <ColForm lg={20}>
                                </ColForm>
                                <ColForm lg={4}>
                                    <Table dataSource={[
                                        {
                                            key: '1',
                                            label: 'Untaxed amount:',
                                            value: state.breakdown.untaxedAmount,
                                        },
                                        {
                                            key: '2',
                                            label: 'Taxed:',
                                            value: state.breakdown.tax,
                                        },
                                        {
                                            key: '3',
                                            label: 'Total:',
                                            value: state.breakdown.total,
                                        },
                                    ]} columns={[
                                        {
                                            title: 'Label',
                                            dataIndex: 'label',
                                            key: 'label',
                                            align: 'right',
                                            render: (text, record) => {
                                                return (<FormLabel>{text}</FormLabel>)
                                            }
                                        },
                                        {
                                            title: 'Value',
                                            dataIndex: 'value',
                                            key: 'value',
                                            align: 'right',
                                        },
                                    ]}
                                           showHeader={false}
                                           pagination={false}
                                           size={'small'}
                                    />
                                </ColForm>
                            </RowForm>
                        </TabPane>
                        <TabPane tab="Other Information" key="2">
                            <RowForm>
                                <ColForm>
                                    <Divider orientation={'left'}>
                                        Sales
                                    </Divider>
                                    <FormItemSelectTest
                                        label={'Salesperson'}
                                        name={'salesperson_id'}
                                        message={'Please select a salesperson'}
                                        required={true}
                                        {...salespersonOption}
                                    />

                                    <FormItemText
                                        label={'Customer Reference'}
                                        name={'customer_reference'}
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
                                    <FormItemSelectTest
                                        label={'Shipping Policy'}
                                        name={'shipping_policy'}
                                        message={'Please select an shipping policy'}
                                        required={true}
                                        options={[
                                            {value: 'as_soon_as_possible', label: 'As soon as possible'},
                                            {
                                                value: 'when_all_products_are_ready',
                                                label: 'When all products are ready'
                                            },
                                        ]}
                                    />
                                    <FormItemDate
                                        label={'Expected delivery date'}
                                        name={'expected_delivery_date'}
                                    />
                                </ColForm>
                                <ColForm>
                                    <Divider orientation={'left'}>
                                        Tracking
                                    </Divider>
                                    <FormItemText
                                        label={'Source document'}
                                        name={'source_document'}
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

export default SalesOrderForm;
