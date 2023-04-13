import {DATE_RANGE, GET, HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE, SEARCH} from "../consts";
import {isLineFieldExecute} from "../Helpers/form";

const manifest = {
    moduleName: "pricelists",
    displayName: "pricelists",
    queryDefaults: {},
    routes: [HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE],
    table: {
        columnSelection: true,
        columns: [{
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: true,
            hidden: true,
        },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            }, {
                title: 'Created At',
                dataIndex: 'created_at',
                key: 'created_at',
                sorter: true,
                filter: DATE_RANGE,
            }
        ]
    },
    initialState: {

    },
    form:{
        initialValue: false,
        onValuesChange: (changedValues, allValues, formContext) => {

            isLineFieldExecute(changedValues,allValues,"customer_products","product_id",(line,allValues)=>{

                formContext.useFetch(`/api/measurements/${line.product_id}`, GET).then((response) => {
                    const customerProducts = allValues.customer_products;
                    customerProducts[line.key] = {
                        ...customerProducts[line.key],
                        measurement_name: response.name
                    };

                    formContext.form.setFieldsValue({
                        customer_products: customerProducts
                    });

                });

            })

        },
        row_1: {
            col_1: [
                {
                    type: 'text',
                    name: 'name',
                    label: 'Name',
                    required: true,
                    size: 'large',
                },
            ],
        },
        tab_1: {
            defaultActiveKey: 'tab_pane_1',
            tab_pane_1: {
                name: "Price Rules",
                form_line_1: {
                    columns: ['Product ID','Product','Measurement', 'Unit Price'],
                    listName: 'customer_products',
                    fields: [
                        {
                            type: 'text',
                            name: 'product_id',
                            placeholder: 'Product ID',
                            required: false,
                            disabled:true
                        },
                        {
                            type: 'select',
                            name: 'product_id',
                            placeholder: 'Product',
                            query: {url: '/api/products', field: 'name'},
                            required: true
                        },
                        // TODO - rest call when viewing
                        {
                            type: 'text',
                            name: 'measurement_name',
                            placeholder: 'Measurement',
                            required: false,
                            disabled:true
                        },
                        {
                            type: 'number',
                            name: 'unit_price',
                            placeholder: 'Unit Price',
                            required: true,
                        }
                    ]
                }
            }
        }
    }

}

export default manifest;
