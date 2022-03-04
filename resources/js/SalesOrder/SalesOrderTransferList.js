import React from 'react';
import useListState from "../Hooks/useListState";
import manifest from "./__manifest__.json";
import TableCreateButton from "../components/TableButtons/TableCreateButton";
import ControlPanel from "../components/ControlPanel";
import ActionsDropdownButton from "../components/TableButtons/ActionsDropdownButton";
import CustomTable from "../components/CustomTable";
import TableSearchInput from "../components/TableSearchInput";
import CustomPagination from "../components/CustomPagination";
import {Tag} from "antd";

const manifestOverride = {
    "moduleName": "sales_order_transfers",
    "eventName": "sales_order_transfers",
    "modelName": "sales_order_transfers"
};

const SalesOrderTransferList = () => {
    const [tableState, tableActions, columns] = useListState(manifestOverride, [
        {
            title: 'Reference',
            dataIndex: 'reference',
            key: 'reference',
            sorter: true,
            searchFilter: true,
        },
        {
            title: 'From',
            dataIndex: 'source_location',
            key: 'source_location',
            sorter: true,
            searchFilter: true,
            render: (text, record) => {
                if (record.source_location) {
                    return record.source_location.name;
                }
                return null;
            }
        },
        {
            title: 'To',
            dataIndex: 'destination_location',
            key: 'destination_location',
            sorter: true,
            searchFilter: true,
            render: (text, record) => {
                if (record.destination_location) {
                    return record.destination_location.name;
                }
                return null;
            }
        },
        {
            title: 'Contact',
            dataIndex: 'contact',
            key: 'contact',
            sorter: true,
            searchFilter: true,
            render: (text, record) => {
                if (record.contact) {
                    return record.contact.name;
                }
                return null;
            }
        },
        {
            title: 'Scheduled Date',
            dataIndex: 'scheduled_date',
            key: 'scheduled_date',
            sorter: true,
            searchFilter: true,
        },
        {
            title: 'Source Document',
            dataIndex: 'source_document',
            key: 'source_document',
            sorter: true,
            searchFilter: true,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            sorter: true,
            searchFilter: true,
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
        },
    ]);
    return (
        <React.Fragment>
            <ControlPanel
                topColTwoRight={
                    <TableSearchInput
                        {...tableState}
                        {...tableActions}
                        manifest={manifestOverride}
                    />
                }
                bottomColOneLeft={<TableCreateButton manifest={manifestOverride}/>}
                bottomColOneRight={
                    <ActionsDropdownButton
                        {...tableState}
                        {...tableActions}
                        manifest={manifestOverride}
                    />
                }
                bottomColTwoRight={
                    <CustomPagination
                        {...tableState}
                        {...tableActions}
                        manifest={manifestOverride}
                    />
                }
            />
            <CustomTable
                {...tableState}
                {...tableActions}
                columns={columns}
                manifest={manifestOverride}
            />
        </React.Fragment>
    )
};

export default SalesOrderTransferList;

