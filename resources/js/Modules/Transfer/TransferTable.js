import React from 'react';
import useListHook from "../../Hooks/useListHook";
import manifest from "./__manifest__.json";
import TableCreateButton from "../../Components/TableButtons/TableCreateButton";
import ControlPanel from "../../Components/ControlPanel";
import ActionsDropdownButton from "../../Components/TableButtons/ActionsDropdownButton";
import CustomTable from "../../Components/CustomTable";
import CustomPagination from "../../Components/CustomPagination";
import {Tag} from "antd";
import Text from "antd/es/typography/Text";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {TableContextProvider} from "../../Contexts/TableContext";
import {DATE_RANGE, SEARCH} from "../../consts";

const TransferTable = () => {
    const [tableState, tableActions] = useListHook(manifest);
    return (
        <TableContextProvider value={{
            manifest: manifest,
            tableState: tableState,
            tableActions: tableActions,
            columnSelection: true,
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
                    title: 'Reference',
                    dataIndex: 'reference',
                    key: 'reference',
                    sorter: true,
                    filter: SEARCH,
                    render: (text, record) => {
                        return <Text strong><span style={{fontSize: '12px'}}>{record.reference}</span></Text>
                    }
                },
                {
                    title: 'From',
                    dataIndex: 'source_location',
                    key: 'source_location',
                    sorter: true,
                    filter: SEARCH,
                    render: (text, record) => {
                        if (record.source_location) {
                            return record.source_location.parents;
                        }
                        return null;
                    }
                },
                {
                    title: 'To',
                    dataIndex: 'destination_location',
                    key: 'destination_location',
                    sorter: true,
                    filter: SEARCH,
                    render: (text, record) => {
                        if (record.destination_location) {
                            return record.destination_location.parents;
                        }
                        return null;
                    }
                },
                {
                    title: 'Contact',
                    dataIndex: 'contact',
                    key: 'contact',
                    sorter: true,
                    filter: SEARCH,
                    render: (text, record) => {
                        if (record.contact) {
                            return record.contact.name;
                        }
                        return null;
                    }
                },
                {
                    title: 'Scheduled Date',
                    dataIndex: 'scheduled_date_human',
                    key: 'scheduled_date_human',
                    sorter: true,
                    filter: SEARCH,
                    render: (text, record) => {
                        if (record.status !== 'done') {
                            if (record.scheduled_date_human.includes('ago')) {
                                return <Text type="danger">{record.scheduled_date_human}</Text>;
                            } else if (record.scheduled_date_human.includes('hours from now')) {
                                return <Text type="warning">{record.scheduled_date_human}</Text>;
                            } else {
                                return record.scheduled_date_human;
                            }
                        }
                        return '';
                    }
                },
                {
                    title: 'Source Document',
                    dataIndex: 'source_document',
                    key: 'source_document',
                    sorter: true,
                    filter: SEARCH,
                },
                {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    sorter: true,
                    filter: SEARCH,
                    render: (text, record) => {
                        const color = {draft: 'processing', done: 'success', cancelled: 'default'};
                        return <Tag color={color[record.status]}>{record.status.toUpperCase()}</Tag>
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

export default TransferTable;

