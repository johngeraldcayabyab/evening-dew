import {DATE_RANGE, HAS_TABLE, SEARCH} from "../consts"
import Text from "antd/es/typography/Text"
import {Space} from "antd"

const manifest = {
    moduleName: "activity_log",
    displayName: "activity_log",
    queryDefaults: {},
    routes: [HAS_TABLE],
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
                title: 'User',
                dataIndex: 'user',
                key: 'user',
                sorter: true,
                filter: SEARCH,
                render: (text, record) => {
                    if (record.user) {
                        return record.user.name;
                    }
                    return null;
                },
                isGlobalSearch: true,
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
                booleanTagRender: [
                    {color: '#87d068', label: 'Created', value: 'created'},
                    {color: '#2db7f5', label: 'Updated', value: 'updated'},
                    {color: '#f50', label: 'Deleted', value: 'deleted'}
                ],
            },
            {
                title: 'Subject ID',
                dataIndex: 'subject_id',
                key: 'subject_id',
                sorter: true,
                filter: SEARCH,
            },
            {
                title: 'Subject Type',
                dataIndex: 'subject_type',
                key: 'subject_type',
                sorter: true,
                filter: SEARCH,
                isGlobalSearch: true,
            },
            {
                title: 'Changes',
                dataIndex: 'changes',
                key: 'changes',
                sorter: false,
                render: (text, record) => {
                    if (record.changes.hasOwnProperty('old')) {
                        const oldObject = record.changes.old;
                        const newObject = record.changes.attributes;
                        const keys = Object.keys(oldObject);
                        const changes = [];
                        keys.forEach(key => {
                            if (key !== 'created_at' && key !== 'updated_at' && oldObject[key] !== newObject[key]) {
                                changes.push(
                                    <Text code key={key}>
                                        {`${key}: ${oldObject[key]} ---> ${newObject[key]}`}
                                    </Text>
                                )
                            }
                        });
                        return (
                            <Space direction={'vertical'}>
                                {changes}
                            </Space>
                        )
                    }
                    return null;
                }
            },
            {
                title: 'Created At',
                dataIndex: 'created_at',
                key: 'created_at',
                sorter: true,
                filter: DATE_RANGE,
            },
        ]
    }
};

export default manifest;
