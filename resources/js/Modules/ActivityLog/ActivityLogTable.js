import React from 'react';
import useListHook from "../../Hooks/useListHook";
import manifest from "./__manifest__.json";
import TableCreateButton from "../../Components/TableButtons/TableCreateButton";
import ControlPanel from "../../Components/ControlPanel";
import CustomTable from "../../Components/CustomTable";
import ActionsDropdownButton from "../../Components/TableButtons/ActionsDropdownButton";
import CustomPagination from "../../Components/CustomPagination";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {TableContextProvider} from "../../Contexts/TableContext";
import {COLUMN_SELECTION, DATE_RANGE, SEARCH} from "../../consts";
import Text from "antd/es/typography/Text";
import {Space} from "antd";

const ActivityLogTable = () => {
    const [tableState, tableActions] = useListHook(manifest);
    return (
        <TableContextProvider value={{
            manifest: manifest,
            tableState: tableState,
            tableActions: tableActions,
            columns: [
                {
                    title: 'ID',
                    dataIndex: 'id',
                    key: 'id',
                    sorter: true,
                    filter: SEARCH,
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
                    }
                },
                {
                    title: 'Description',
                    dataIndex: 'description',
                    key: 'description',
                    sorter: true,
                    filter: SEARCH,
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
                                    changes.push(<Text code key={key}>{`${key}: ${oldObject[key]} ---> ${newObject[key]}`}</Text>)
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
                {
                    title: '',
                    dataIndex: COLUMN_SELECTION,
                    key: COLUMN_SELECTION,
                    filter: COLUMN_SELECTION,
                },
            ]
        }}>
            <ControlPanel
                topColOneLeft={<CustomBreadcrumb/>}
                topColTwoRight={''}
                bottomColOneLeft={<TableCreateButton/>}
                bottomColOneRight={<ActionsDropdownButton/>}
                bottomColTwoRight={<CustomPagination/>}
            />
            <CustomTable/>
        </TableContextProvider>
    )
};

export default ActivityLogTable;