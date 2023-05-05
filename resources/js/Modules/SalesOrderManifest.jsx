import {disableIfStatus} from "../Helpers/object";
import {DATE_RANGE, GET, HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE, SEARCH} from "../consts";
import {getPersistedKey, isLineFieldExecute} from "../Helpers/form";
import SalesOrderPDF from "./SalesOrder/SalesOrderPDF";
import SalesOrderBreakDown from "./SalesOrder/SalesOrderBreakDown";
import CreateInvoiceButton from "./SalesOrder/CreateInvoiceButton"

const manifest = {
    moduleName: "sales_orders",
    displayName: "sales_orders",
    queryDefaults: {},
    routes: [HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE],
    table: {
        columnSelection: true,
        columns: [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                sorter: true,
                hidden: true,
            },
            {
                title: 'Number',
                dataIndex: 'number',
                key: 'number',
                sorter: true,
                filter: SEARCH,
                sequenceNumberRender: true,
                isGlobalSearch: true,
            },
            {
                title: 'Customer',
                dataIndex: 'customer',
                key: 'customer',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    return record.customer.name;
                },
                isGlobalSearch: true,
            },
            {
                title: 'Salesperson',
                dataIndex: 'salesperson',
                key: 'salesperson',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    return record.salesperson.name;
                },
                isGlobalSearch: true,
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                sorter: true,
                filter: SEARCH,
                booleanTagRender: [
                    {color: 'processing', label: 'Draft', value: 'draft'},
                    {color: 'default', label: 'Cancelled', value: 'cancelled'},
                    {color: 'success', label: 'Done', value: 'done'}
                ],
                isGlobalSearch: true,
            },
            {
                title: 'Source Document',
                dataIndex: 'source_document',
                key: 'source_document',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Shipping date',
                dataIndex: 'shipping_date',
                key: 'shipping_date',
                sorter: true,
                filter: DATE_RANGE,
            },
            {
                title: 'Created At',
                dataIndex: 'created_at',
                key: 'created_at',
                sorter: true,
                filter: DATE_RANGE,
            },
        ]
    },
    initialState: {
        breakdown: {
            untaxedAmount: 0, tax: 0, total: 0,
        },
        pricelist: {
            contactId:-1,
            id: -1
        }
    },
    statuses: [
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
            type: 'primary',
            label: 'Cancel',
            status: {draft: 'wait', done: 'wait', cancelled: 'finish'},
            visibility: {draft: 'visible', done: 'hidden', cancelled: 'hidden'},
        },
    ],
    formLinks: [
        {
            module: 'invoices', param: 'source_document', value: 'number', label: 'Invoices',
        },
        {
            module: 'transfers', param: 'source_document', value: 'number', label: 'Deliveries',
        },
    ],
    customButtons: [<CreateInvoiceButton/>],
    form: {
        afterRender: (formContext) => {
            const initialValues = formContext.formState.initialValues;

            if (initialValues.pricelist_id) {
                formContext.useFetch(`/api/pricelists/${initialValues.pricelist_id}`, GET)
                    .then((response) => {
                        formContext.setState((prevState) => ({
                            ...prevState,
                            pricelist: {
                                id: response.id
                            }
                        }));
                    })

            }
        },
        initialValue: true,
        onValuesChange: (changedValues, allValues, formContext) => {
            if (changedValues.customer_id) {
                formContext.useFetch(`/api/addresses`, GET, {
                    contact_id: changedValues.customer_id
                }).then((response) => {
                    const data = response.data;
                    let defaultAddress = data.find((address) => (address.type === 'default'));
                    let invoiceAddress = data.find((address) => (address.type === 'invoice'));
                    let deliveryAddress = data.find((address) => (address.type === 'delivery'));
                    invoiceAddress = invoiceAddress ? invoiceAddress : defaultAddress;
                    deliveryAddress = deliveryAddress ? deliveryAddress : defaultAddress;
                    const invoiceCity = invoiceAddress.city;
                    const deliveryCity = deliveryAddress.city;
                    if (invoiceCity) {
                        formContext.options['invoice_city_id-options'].getOptions({id: invoiceCity.id});
                    }
                    if (deliveryCity) {
                        formContext.options['delivery_city_id-options'].getOptions({id: deliveryCity.id});
                    }
                    formContext.form.setFieldsValue({
                        invoice_phone: invoiceAddress.contact.phone,
                        delivery_phone: deliveryAddress.contact.phone,
                        invoice_address: invoiceAddress.address,
                        delivery_address: deliveryAddress.address,
                        invoice_city_id: invoiceCity ? invoiceCity.id : null,
                        delivery_city_id: deliveryCity ? deliveryCity.id : null,
                    });
                    // // invoiceCityOptions.getOptions({id: invoiceAddress.city.id});
                    // // deliveryCityOptions.getOptions({id: deliveryAddress.city.id});
                    // form.setFieldsValue({
                    //     invoice_phone: defaultAddress.contact.phone,
                    //     delivery_phone: defaultAddress.contact.phone,
                    //     invoice_address: invoiceAddress.address,
                    //     delivery_address: deliveryAddress.address,
                    //     invoice_city_id: invoiceAddress.city.id,
                    //     delivery_city_id: deliveryAddress.city.id,
                    // });
                    //
                    // setDeliveryFeeByCity({delivery_city_id: deliveryAddress.city.id}, allValues);
                });
            }
            const cityId = changedValues.delivery_city_id;
            if (cityId) {
                formContext.useFetch(`/api/cities/${cityId}`, GET).then((response) => {
                    if (response.delivery_fee_lines.length) {
                        // console.log(response);
                        const product = response.delivery_fee_lines[0].product;
                        const deliveryFeeLineFee = response.delivery_fee_lines[0].fee;
                        let salesOrderLines = allValues.sales_order_lines;
                        const deliveryFeeData = {
                            product_id: product.id,
                            description: product.sales_description,
                            quantity: 1,
                            measurement_id: product.sales_measurement_id,
                            unit_price: deliveryFeeLineFee, //product unit
                            // unit_price: product.sales_price, // it's either this or this
                        };
                        if (salesOrderLines) {
                            salesOrderLines.push(deliveryFeeData);
                        } else {
                            salesOrderLines = [];
                            salesOrderLines.push(deliveryFeeData);
                        }
                        formContext.form.setFieldsValue({
                            sales_order_lines: salesOrderLines
                        });
                        if (formContext.options['product_id-lineOptions'].keys.length === 0) {
                            formContext.options['product_id-lineOptions'].getOptions(product.name, 0);
                        } else if (formContext.options['product_id-lineOptions'].keys.length > 0) {
                            const maxProductLineOptionKey = Math.max(...formContext.options['product_id-lineOptions'].keys);
                            formContext.options['product_id-lineOptions'].getOptions(product.name, maxProductLineOptionKey + 1);
                        }
                    }
                });
            }
            isLineFieldExecute(changedValues, allValues, 'sales_order_lines', 'product_id', (line, allValues) => {

                async function useFetchAsync() {
                    return formContext.useFetch(`/api/pricelists/${formContext.state.pricelist.id}/products/${line.product_id}`, GET);
                }

                formContext.useFetch(`/api/products/${line.product_id}`, GET).then(async (response) => {

                    const isPricelistSet = formContext.state.pricelist.id && formContext.state.pricelist.id !== -1;
                    let pricelistPrice = -1;

                    if (isPricelistSet) {

                        const res = await useFetchAsync();
                        if (res && res.unit_price) {
                            pricelistPrice = res.unit_price;
                        }
                    }

                    const salesOrderLines = allValues.sales_order_lines;
                    salesOrderLines[line.key] = {
                        ...salesOrderLines[line.key],
                        description: response.sales_description,
                        quantity: 1,
                        measurement_id: response.sales_measurement_id,
                        unit_price: isPricelistSet && pricelistPrice !== -1 ? pricelistPrice : response.sales_price,
                    };
                    formContext.form.setFieldsValue({
                        sales_order_lines: salesOrderLines
                    });
                    const persistedKey = getPersistedKey(line, formContext.options['measurement_id-lineOptions'].options);
                    formContext.options['measurement_id-lineOptions'].getOptions(response.sales_measurement.name, persistedKey);
                });
            });
            isLineFieldExecute(changedValues, allValues, 'sales_order_lines', 'quantity', (changedSalesOrderLine, allValues) => {
                const salesOrderLines = allValues.sales_order_lines;
                let salesOrderLine = salesOrderLines[changedSalesOrderLine.key];
                if (changedSalesOrderLine.hasOwnProperty('unit_price')) {
                    salesOrderLine.subtotal = salesOrderLine.quantity * changedSalesOrderLine.unit_price;
                } else if (changedSalesOrderLine.hasOwnProperty('quantity')) {
                    salesOrderLine.subtotal = changedSalesOrderLine.quantity * salesOrderLine.unit_price;
                }
                salesOrderLines[changedSalesOrderLine.key] = salesOrderLine;
                formContext.form.setFieldsValue({
                    sales_order_lines: salesOrderLines
                });
                const total = salesOrderLines.map((salesOrderLine) => (salesOrderLine.subtotal)).reduce((total, subtotal) => (total + subtotal));
                formContext.setState((prevState) => ({
                    ...prevState,
                    breakdown: {
                        untaxedAmount: total,
                        tax: 0,
                        total: total,
                    }
                }));
            });
            isLineFieldExecute(changedValues, allValues, 'sales_order_lines', 'unit_price', (changedSalesOrderLine, allValues) => {
                const salesOrderLines = allValues.sales_order_lines;
                let salesOrderLine = salesOrderLines[changedSalesOrderLine.key];
                if (changedSalesOrderLine.hasOwnProperty('unit_price')) {
                    salesOrderLine.subtotal = salesOrderLine.quantity * changedSalesOrderLine.unit_price;
                } else if (changedSalesOrderLine.hasOwnProperty('quantity')) {
                    salesOrderLine.subtotal = changedSalesOrderLine.quantity * salesOrderLine.unit_price;
                }
                salesOrderLines[changedSalesOrderLine.key] = salesOrderLine;
                formContext.form.setFieldsValue({
                    sales_order_lines: salesOrderLines
                });
                const total = salesOrderLines.map((salesOrderLine) => (salesOrderLine.subtotal)).reduce((total, subtotal) => (total + subtotal));
                formContext.setState((prevState) => ({
                    ...prevState,
                    breakdown: {
                        untaxedAmount: total,
                        tax: 0,
                        total: total,
                    }
                }));
            });
        },
        row_1: {
            col_1: [
                {
                    type: 'status',
                    name: 'status',
                },
                {
                    type: 'text',
                    name: 'number',
                    label: 'Number',
                    required: true,
                    size: 'large',
                },
            ],
        },
        row_2: {
            col_1: [
                {
                    type: 'select',
                    name: 'customer_id',
                    label: 'Customer',
                    query: {url: '/api/contacts', field: 'name'},
                    required: true,
                    handleOnChange: (formContext) => {
                        return (val) => {
                            formContext.setState((prevState) => ({
                                ...prevState,
                                pricelist: {
                                    id:prevState.pricelist.id,
                                    contactId: val
                                }
                            }));
                        }
                    }
                },
                {
                    type: 'select',
                    name: 'pricelist_id',
                    label: 'Pricelist',
                    query: {url: '/api/pricelists', field: 'name'},
                    required: false,
                    handleOnChange: (formContext) => {
                        return (val) => {
                            formContext.setState((prevState) => ({
                                ...prevState,
                                pricelist: {
                                    contactId:prevState.pricelist.contactId,
                                    id: val
                                }
                            }));
                        }
                    }
                },
                {
                    type: 'select',
                    name: 'shipping_method',
                    label: 'Shipping Method',
                    options: [
                        {value: 'delivery', label: 'Delivery'},
                        {value: 'pickup', label: 'Pickup'},
                    ]
                },
                {
                    type: 'textarea',
                    name: 'notes',
                    label: 'Notes',
                },
            ],
            col_2: [
                {
                    type: 'date',
                    name: 'shipping_date',
                    label: 'Shipping date',
                },
                {
                    type: 'date',
                    name: 'quotation_date',
                    label: 'Quotation Date',
                },
                {
                    type: 'textarea',
                    name: 'source_document',
                    label: 'Source document',
                },
            ],
        },
        divider_1: {
            orientation: 'left',
            label: 'Addresses'
        },
        row_3: {
            col_1: [
                {
                    type: 'text',
                    name: 'invoice_address',
                    label: 'Invoice address',
                },
                {
                    type: 'select',
                    name: 'invoice_city_id',
                    label: 'Invoice city',
                    query: {url: '/api/cities', field: 'name'},
                },
                {
                    type: 'text',
                    name: 'invoice_phone',
                    label: 'Invoice Phone',
                },
            ],
            col_2: [
                {
                    type: 'text',
                    name: 'delivery_address',
                    label: 'Delivery address',
                },
                {
                    type: 'select',
                    name: 'delivery_city_id',
                    label: 'Delivery city',
                    query: {url: '/api/cities', field: 'name'},
                },
                {
                    type: 'text',
                    name: 'delivery_phone',
                    label: 'Delivery Phone',
                },
            ]
        },
        tab_1: {
            defaultActiveKey: 'tab_pane_1',
            tab_pane_1: {
                name: "Order Lines",
                form_line_1: {
                    columns: ['Product', 'Description', 'Quantity', 'Measurement', 'Unit Price', 'Shipping Date', 'Subtotal'],
                    listName: 'sales_order_lines',
                    fields: [
                        {
                            type: 'select',
                            name: 'product_id',
                            placeholder: 'Product',
                            query: {url: '/api/products', field: 'name'},
                            required: true,
                            overrideDisabled: (formContext) => {
                                return disableIfStatus(formContext.formState, 'done')
                            }
                        },
                        {
                            type: 'text',
                            name: 'description',
                            placeholder: 'Description',
                        },
                        {
                            type: 'number',
                            name: 'quantity',
                            placeholder: 'Quantity',
                            required: true,
                            overrideDisabled: (formContext) => {
                                return disableIfStatus(formContext.formState, 'done')
                            }
                        },
                        {
                            type: 'select',
                            name: 'measurement_id',
                            placeholder: 'Measurement',
                            query: {url: '/api/measurements', field: 'name'},
                            required: true,
                            overrideDisabled: (formContext) => {
                                return disableIfStatus(formContext.formState, 'done')
                            }
                        },
                        {
                            type: 'number',
                            name: 'unit_price',
                            placeholder: 'Unit Price',
                            required: true,
                        },
                        {
                            type: 'date',
                            name: 'shipping_date',
                            placeholder: 'Shipping date',
                            overrideDisabled: (formContext) => {
                                return disableIfStatus(formContext.formState, 'done')
                            }
                        },
                        {
                            type: 'number',
                            name: 'subtotal',
                            placeholder: 'Subtotal',
                            overrideDisabled: true,
                        },
                    ]
                },
            },
            tab_pane_2: {
                name: "Other Information",
                row_1: {
                    col_1: [
                        {
                            type: 'divider',
                            name: 'divider_1',
                            orientation: 'left',
                            label: 'Sales'
                        },
                        {
                            type: 'select',
                            name: 'salesperson_id',
                            label: 'Salesperson',
                            query: {url: '/api/users', field: 'name'},
                            required: true
                        },
                        {
                            type: 'text',
                            name: 'customer_reference',
                            label: 'Customer Reference',
                        },
                    ],
                    col_2: [
                        {
                            type: 'divider',
                            name: 'divider_1',
                            orientation: 'left',
                            label: 'Invoicing'
                        },
                    ]
                },
                rows_2: {
                    col_1: [
                        {
                            type: 'divider',
                            name: 'divider_1',
                            orientation: 'left',
                            label: 'Delivery'
                        },
                        {
                            type: 'select',
                            name: 'shipping_policy',
                            label: 'Shipping Policy',
                            options: [
                                {value: 'as_soon_as_possible', label: 'As soon as possible'},
                                {value: 'when_all_products_are_ready', label: 'When all products are ready'},
                            ],
                            required: true
                        },
                    ],
                    col_2: [
                        {
                            type: 'divider',
                            name: 'divider_1',
                            orientation: 'left',
                            label: 'Tracking'
                        },
                        {
                            type: 'select',
                            name: 'source_id',
                            label: 'Source',
                            query: {url: '/api/sources', field: 'name'},
                        },
                    ]
                },
                row_3: {
                    col_1: [
                        {
                            type: 'date',
                            name: 'expiration_date',
                            label: 'Expiration Date',
                        },
                        {
                            type: 'select',
                            name: 'payment_term_id',
                            label: 'Payment Term',
                            query: {url: '/api/payment_terms', field: 'name'},
                        },
                    ],
                }
            },
        },
        divider_2: true,
        row_4: {
            col_1: [
                {
                    type: 'component',
                    component: <SalesOrderPDF key={'companello'}/>
                },
            ],
            col_2: [
                {
                    type: 'component',
                    component: <SalesOrderBreakDown key={'companella'}/>
                },
            ]
        }
    }
};

export default manifest;
