import {DATE_RANGE, HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE, SEARCH} from "../consts";

const manifest = {
    moduleName: "pricelists",
    displayName: "pricelists",
    queryDefaults: {},
    routes: [HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE],
    table: {
        columnSelection: true,
        columns: [{
            title: 'Number',
            dataIndex: 'id',
            key: 'id',
            sorter: true
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
        row_1: {
            col_1: [
                {
                    type: 'text',
                    name: 'id',
                    label: 'Number',
                    disabled: true,
                    size: 'large',
                },
            ],
        },
        row_2: {
            col_1: [
                {
                    type: 'text',
                    name: 'name',
                    label: 'Name',
                    size: 'large',
                },
            ],
        },
        tab_1: {
            defaultActiveKey: 'tab_pane_1',
            tab_pane_1: {
                name: "Price Rules",
                form_line_1: {
                    columns: ['Product ID','Product', 'Unit Price'],
                    listName: 'customer_products',
                    fields: [
                        {
                            type: 'text',
                            name: 'product_id',
                            key:'product_id-' + Date.now(),
                            placeholder: 'Product ID',
                            readOnly: true,
                            handleOnClick:(formContext)=>{
                                return (e)=>{
                                    if(e.target.value){
                                        const productPath = "/products/" + e.target.value;
                                        formContext.navigate(productPath);
                                    }

                                }

                            }
                        },
                        {
                            type: 'select',
                            name: 'product_id',
                            placeholder: 'Product',
                            query: {url: '/api/products', field: 'name'},
                            required: true
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
