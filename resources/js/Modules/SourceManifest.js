import {DATE_RANGE, HAS_FORM_CREATE, HAS_FORM_UPDATE, HAS_TABLE, SEARCH} from "../consts"

const manifest = {
    moduleName: "sources",
    displayName: "sources",
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
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Color',
                dataIndex: 'color',
                key: 'color',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
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
    form: {
        row_1: {
            col_1: [
                {
                    type: 'text',
                    name: 'name',
                    label: 'Name',
                    required: true
                },
                {
                    type: 'text',
                    name: 'color',
                    label: 'Color',
                },
            ]
        }
    }
};

export default manifest;
