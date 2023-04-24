import React, {useEffect, useState} from 'react';
import {Divider, Form, Space, Table, Tabs} from "antd";
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
import {GET} from "../../consts";
import FormItemNumber from "../../Components/FormItem/FormItemNumber";
import {isLineFieldExecute} from "../../Helpers/form";
import FormItemDate from "../../Components/FormItem/FormItemDate";
import FormItemTime from "../../Components/FormItem/FormItemTime";
import FormItemStatus from "../../Components/FormItem/FormItemStatus";
import FormLabel from "../../Components/Typography/FormLabel";
import {objectHasValue, selectTimeOptions} from "../../Helpers/object";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import useFetchHook from "../../Hooks/useFetchHook";
import {FormContextProvider} from "../../Contexts/FormContext";
import FormItemSelect from "../../Components/FormItem/FormItemSelect";
import useOptionHook from "../../Hooks/useOptionHook";
import useOptionLineHook from "../../Hooks/useOptionLineHook";
import FormItemLineId from "../../Components/FormItem/FormItemLineId";
import FormLineParent from "../../Components/FormLines/FormLineParent";
import NextPreviousRecord from "../../Components/NextPreviousRecord";
import FormItemTextArea from "../../Components/FormItem/FormItemTextArea";
import PrintPreviewButton from "../../Components/FormButtons/PrintPreviewButton";
import ViewInvoice from "../ViewInvoice";

const {TabPane} = Tabs;

const SmNorthForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest, true);
    // const customerOptions = useOptionHook('/api/contacts', 'customer.name');
    const invoiceCityOptions = useOptionHook('/api/cities', 'invoice_city.name');
    const deliveryCityOptions = useOptionHook('/api/cities', 'delivery_city.name');
    const paymentTermOptions = useOptionHook('/api/payment_terms', 'payment_term.name');
    const salespersonOption = useOptionHook('/api/users', 'responsible.name');
    const productLineOptions = useOptionLineHook('/api/products', 'product.name');
    const sourceOptions = useOptionHook('/api/sources', 'source.name');
    const courierOptions = useOptionHook('/api/couriers', 'courier.name');

    const useFetch = useFetchHook();
    const fetchCatcher = useFetchCatcherHook();
    const [state, setState] = useState({
        breakdown: {
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
                        total: total,
                    }
                }));
            }
        }
        // customerOptions.getInitialOptions(formState);
        invoiceCityOptions.getInitialOptions(formState);
        deliveryCityOptions.getInitialOptions(formState);
        paymentTermOptions.getInitialOptions(formState);
        salespersonOption.getInitialOptions(formState);
        sourceOptions.getInitialOptions(formState);
        courierOptions.getInitialOptions(formState);
        productLineOptions.getInitialOptions(formState, 'sales_order_lines');
    }, [formState.initialValues]);

    function onValuesChange(changedValues, allValues) {
        setLinesShippingDate(changedValues, allValues);
        // setDefaultValuesFromCustomer(changedValues, allValues);
        setDeliveryFeeByCity(changedValues, allValues);
        isLineFieldExecute(changedValues, allValues, 'sales_order_lines', 'product_id', getProductInfoAndSetValues);
        isLineFieldExecute(changedValues, allValues, 'sales_order_lines', 'quantity', computeSubtotal);
        isLineFieldExecute(changedValues, allValues, 'sales_order_lines', 'unit_price', computeSubtotal);
    }

    function setLinesShippingDate(changedValues, allValues) {
        if (changedValues.shipping_date) {
            let salesOrderLines = allValues.sales_order_lines;
            if (salesOrderLines && salesOrderLines.length) {
                form.setFieldsValue({
                    sales_order_lines: salesOrderLines.map((salesOrderLine) => ({
                        ...salesOrderLine,
                        shipping_date: changedValues.shipping_date.format('YYYY-MM-DD HH:mm:ss')
                    }))
                });
            }
        }
    }

    function setDefaultValuesFromCustomer(changedValues, allValues) {
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
                invoiceCityOptions.getOptions({id: invoiceAddress.city.id});
                deliveryCityOptions.getOptions({id: deliveryAddress.city.id});
                form.setFieldsValue({
                    invoice_phone: defaultAddress.contact.phone,
                    delivery_phone: defaultAddress.contact.phone,
                    invoice_address: invoiceAddress.address,
                    delivery_address: deliveryAddress.address,
                    invoice_city_id: invoiceAddress.city.id,
                    delivery_city_id: deliveryAddress.city.id,
                });

                setDeliveryFeeByCity({delivery_city_id: deliveryAddress.city.id}, allValues);
            }).catch((responseErr) => {
                fetchCatcher.get(responseErr);
            });
        }
    }

    function setDeliveryFeeByCity(changedValues, allValues) {
        const cityId = changedValues.delivery_city_id;
        if (cityId) {
            useFetch(`/api/cities/${cityId}`, GET).then((response) => {
                if (response.delivery_fee_lines.length) {
                    const product = response.delivery_fee_lines[0].product;
                    let salesOrderLines = allValues.sales_order_lines;
                    const deliveryFeeData = {
                        product_id: product.id,
                        description: product.sales_description,
                        quantity: 1,
                        unit_price: product.sales_price,
                    };
                    if (salesOrderLines) {
                        salesOrderLines.push(deliveryFeeData);
                    } else {
                        salesOrderLines = [];
                        salesOrderLines.push(deliveryFeeData);
                    }
                    form.setFieldsValue({
                        sales_order_lines: salesOrderLines
                    });
                    if (productLineOptions.keys.length === 0) {
                        productLineOptions.getOptions(product.name, 0);
                    } else if (productLineOptions.keys.length > 0) {
                        const maxProductLineOptionKey = Math.max(...productLineOptions.keys);
                        productLineOptions.getOptions(product.name, maxProductLineOptionKey + 1);
                    }
                }
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
                description: response.sales_description,
                unit_price: response.sales_price,
            };
            form.setFieldsValue({
                sales_order_lines: salesOrderLines
            });
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
                total: total,
            }
        }));
    }

    function computeTotal(salesOrderLines) {
        return salesOrderLines.map((salesOrderLine) => (salesOrderLine.subtotal)).reduce((total, subtotal) => (total + subtotal));
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
                onFinish: formActions.onFinish,
                onValuesChange: onValuesChange,
            }}
        >
            <CustomForm>
                <ControlPanel
                    topColOneLeft={<CustomBreadcrumb/>}
                    bottomColOneLeft={<FormButtons/>}
                    bottomColOneRight={
                        <Space size={'small'} key={'print-preview-button'}>
                            <PrintPreviewButton/>
                        </Space>
                    }
                    bottomColTwoRight={<NextPreviousRecord/>}
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
                        </ColForm>
                    </RowForm>

                    <RowForm>
                        <ColForm>
                            {/*<FormItemSelect*/}
                            {/*    placeholder={'Search or Create a Customer'}*/}
                            {/*    label={'Customer'}*/}
                            {/*    name={'customer_id'}*/}
                            {/*    message={'Please select a customer'}*/}
                            {/*    required={true}*/}
                            {/*    {...customerOptions}*/}
                            {/*    dropdownRender={customerOptions}*/}
                            {/*/>*/}

                            <FormItemText
                                label={'Customer'}
                                name={'customer_name'}
                                required={true}
                            />

                            <FormItemDate
                                placeholder={'Please Select Date'}
                                label={'Shipping date'}
                                name={'shipping_date'}
                                required={true}
                            />

                            <FormItemTextArea
                                placeholder={'Notes and Requests here...'}
                                label={'Notes'}
                                name={'notes'}
                            />

                            <FormItemText
                                label={'Source document'}
                                name={'source_document'}
                                required={true}
                            />


                        </ColForm>
                        <ColForm>

                            <FormItemDate
                                label={'Quotation Date'}
                                name={'quotation_date'}
                            />

                            <FormItemSelect
                                label={'Source'}
                                name={'source_id'}
                                // disabled={true}
                                // overrideDisabled={true}
                                {...sourceOptions}
                            />


                            <FormItemSelect
                                label={'Courier'}
                                name={'courier_id'}
                                {...courierOptions}
                            />

                            <FormItemTime
                                label={'Pickup Time'}
                                name={'pickup_time'}
                            />

                            <FormItemText
                                label={'Ready by'}
                                name={'ready_by'}
                            />

                        </ColForm>
                    </RowForm>
                    <RowForm>
                        <ColForm>
                            <Divider orientation={'left'}>
                                Shipping Details
                            </Divider>
                            <FormItemText
                                placeholder={'Type "X" if Pick up'}
                                label={'Delivery address'}
                                name={'delivery_address'}
                            />
                            <FormItemSelect
                                label={'Delivery city'}
                                name={'delivery_city_id'}
                                {...deliveryCityOptions}
                            />
                            <FormItemText
                                label={'Delivery Phone'}
                                name={'delivery_phone'}
                            />
                        </ColForm>
                        <ColForm>
                            <Divider orientation={'left'}>
                                Invoice Details
                            </Divider>
                            <FormItemText
                                label={'Invoice address'}
                                name={'invoice_address'}
                            />
                            <FormItemSelect
                                label={'Invoice city'}
                                name={'invoice_city_id'}
                                {...invoiceCityOptions}
                            />
                            <FormItemText
                                label={'Invoice Phone'}
                                name={'invoice_phone'}
                            />
                        </ColForm>
                    </RowForm>
                    <Divider/>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Order Lines" key="1">
                            <RowForm>
                                <ColForm lg={24}>
                                    <FormLineParent
                                        columns={['Product', 'Quantity', 'Description', 'Unit Price', 'Subtotal']}
                                        listName={'sales_order_lines'}
                                    >
                                        <FormItemLineId name={'id'}/>
                                        <FormItemSelect
                                            placeholder={'Product'}
                                            name={'product_id'}
                                            message={'Please select a product'}
                                            required={true}
                                            optionAggregate={productLineOptions}
                                            dropdownRender={productLineOptions}
                                        />
                                        <FormItemNumber
                                            placeholder={'Quantity'}
                                            name={'quantity'}
                                            message={'Please input a quantity'}
                                            required={true}
                                        />
                                        <FormItemText
                                            placeholder={'Description'}
                                            name={'description'}
                                            listName={'sales_order_lines'}
                                        />
                                        <FormItemNumber
                                            placeholder={'Unit Price'}
                                            name={'unit_price'}
                                            message={'Please input a unit price'}
                                            required={true}
                                        />
                                        <FormItemNumber
                                            overrideDisabled={true}
                                            placeholder={'Subtotal'}
                                            name={'subtotal'}
                                        />
                                    </FormLineParent>
                                </ColForm>
                            </RowForm>
                            <Divider/>
                            <RowForm>
                                <ColForm lg={20}>
                                    <ViewInvoice/>
                                </ColForm>
                                <ColForm lg={4}>
                                    <Table dataSource={[
                                        {
                                            key: '1',
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
                                    <FormItemSelect
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
                                    <FormItemSelect
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
                                </ColForm>
                                <ColForm>
                                    <Divider orientation={'left'}>
                                        Tracking
                                    </Divider>
                                </ColForm>
                            </RowForm>
                            <RowForm>
                                <ColForm>
                                    <FormItemDate
                                        label={'Expiration Date'}
                                        name={'expiration_date'}
                                        showTime={true}
                                    />
                                    <FormItemSelect
                                        label={'Payment Term'}
                                        name={'payment_term_id'}
                                        {...paymentTermOptions}
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

export default SmNorthForm;
