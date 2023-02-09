import SalesOrderTable from "./SalesOrderTable";
import {disableIfStatus} from "../../Helpers/object"
import {GET} from "../../consts"
import {getPersistedKey, isLineFieldExecute} from "../../Helpers/form"
import SalesOrderPDF from "./SalesOrderPDF"
import SalesOrderBreakDown from "./SalesOrderBreakDown"
import FormGenerator from "../../Components/Form/FormGenerator"

const displayName = "sales_orders";

const manifest = {
    "moduleName": "sales_orders",
    "displayName": "sales_orders",
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: () => (<FormGenerator {...manifest} />)},
        {path: `/${displayName}/:id`, component: () => (<FormGenerator {...manifest} />)},
        {path: `/${displayName}`, component: SalesOrderTable},
    ],
    initialState: {
        breakdown: {
            untaxedAmount: 0, tax: 0, total: 0,
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
            type: 'ghost',
            label: 'Cancel',
            status: {draft: 'wait', done: 'wait', cancelled: 'finish'},
            visibility: {draft: 'visible', done: 'hidden', cancelled: 'hidden'},
        },
    ],
    formLinks: [
        {
            module: 'transfers', param: 'source_document', value: 'number', label: 'Deliveries',
        },
    ],
    form: {
        initialValue: true,
        onValuesChange: (changedValues, allValues, formContext) => {
            const cityId = changedValues.delivery_city_id;
            if (cityId) {
                formContext.useFetch(`/api/cities/${cityId}`, GET).then((response) => {
                    if (response.delivery_fee_lines.length) {
                        console.log(response);
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
                }).catch((responseErr) => {
                    formContext.fetchCatcher.get(responseErr);
                });
            }
            isLineFieldExecute(changedValues, allValues, 'sales_order_lines', 'product_id', (line, allValues) => {
                formContext.useFetch(`/api/products/${line.product_id}`, GET).then((response) => {
                    const salesOrderLines = allValues.sales_order_lines;
                    salesOrderLines[line.key] = {
                        ...salesOrderLines[line.key],
                        description: response.sales_description,
                        quantity: 1,
                        measurement_id: response.sales_measurement_id,
                        unit_price: response.sales_price,
                    };
                    formContext.form.setFieldsValue({
                        sales_order_lines: salesOrderLines
                    });
                    const persistedKey = getPersistedKey(line, formContext.options['sales_measurement_id-options']);
                    formContext.options['sales_measurement_id-options'].getOptions(response.sales_measurement.name, persistedKey);
                }).catch((responseErr) => {
                    formContext.fetchCatcher.get(responseErr);
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
                    query: {url: '/api/contacts', field: 'contact.name'},
                    required: true,
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
                    query: {url: '/api/cities', field: 'invoice_city.name'},
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
                    query: {url: '/api/cities', field: 'delivery_city.name'},
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
                            query: {url: '/api/products', field: 'product.name'},
                            required: true,
                            listName: 'sales_order_lines',
                            overrideDisabled: (formContext) => {
                                return disableIfStatus(formContext.formState, 'done')
                            }
                        },
                        {
                            type: 'text',
                            name: 'description',
                            placeholder: 'Description',
                            listName: 'sales_order_lines',
                        },
                        {
                            type: 'number',
                            name: 'quantity',
                            placeholder: 'Quantity',
                            required: true,
                            listName: 'sales_order_lines',
                            overrideDisabled: (formContext) => {
                                return disableIfStatus(formContext.formState, 'done')
                            }
                        },
                        {
                            type: 'select',
                            name: 'measurement_id',
                            placeholder: 'Measurement',
                            query: {url: '/api/measurements', field: 'measurement.name'},
                            required: true,
                            listName: 'sales_order_lines',
                            overrideDisabled: (formContext) => {
                                return disableIfStatus(formContext.formState, 'done')
                            }
                        },
                        {
                            type: 'number',
                            name: 'unit_price',
                            placeholder: 'Unit Price',
                            required: true,
                            listName: 'sales_order_lines',
                        },
                        {
                            type: 'date',
                            name: 'shipping_date',
                            placeholder: 'Shipping date',
                            listName: 'sales_order_lines',
                            overrideDisabled: (formContext) => {
                                return disableIfStatus(formContext.formState, 'done')
                            }
                        },
                        {
                            type: 'number',
                            name: 'subtotal',
                            placeholder: 'Subtotal',
                            listName: 'sales_order_lines',
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
                            query: {url: '/api/users', field: 'salesperson.name'},
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
                            query: {url: '/api/sources', field: 'source.name'},
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
                            query: {url: '/api/payment_terms', field: 'payment_term.name'},
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
