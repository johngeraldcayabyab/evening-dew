import {DATE_RANGE, HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE, SEARCH} from "../consts";

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
                    columns: ['Product','Measurement', 'Unit Price'],
                    listName: 'customer_products',
                    fields: [
                        {
                            type: 'select',
                            name: 'product_id',
                            placeholder: 'Product',
                            query: {url: '/api/products', field: 'name'},
                            required: true
                        },
                        {
                            type: 'text',
                            name: 'measurement_id',
                            required: false,
                            handleOnClick: ()=>{
                                console.log("test handleonclick")
                            }
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
