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

        }
    }

}

export default manifest;