import React from 'react';
import useListState from "../../Hooks/useListState";
import manifest from "./__manifest__.json";
import TableCreateButton from "../../Components/TableButtons/TableCreateButton";
import ControlPanel from "../../Components/ControlPanel";
import ActionsDropdownButton from "../../Components/TableButtons/ActionsDropdownButton";
import CustomTable from "../../Components/CustomTable";
import TableSearchInput from "../../Components/TableSearchInput";
import CustomPagination from "../../Components/CustomPagination";
import {Tag} from "antd";
import Text from "antd/es/typography/Text";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";

const TransferList = () => {
    const [tableState, tableActions, columns] = useListState(manifest, [
        {
            title: 'Reference',
            dataIndex: 'reference',
            key: 'reference',
            sorter: true,
            searchFilter: true,
            render: (text, record) => {
                return <Text strong><span style={{fontSize: '12px'}}>{record.reference}</span></Text>
            }
        },
        {
            title: 'From',
            dataIndex: 'source_location',
            key: 'source_location',
            sorter: true,
            searchFilter: true,
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
            searchFilter: true,
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
                topColOneLeft={<CustomBreadcrumb tableState={tableState}/>}
                topColTwoRight={
                    <TableSearchInput
                        {...tableState}
                        {...tableActions}
                        manifest={manifest}
                    />
                }
                bottomColOneLeft={<TableCreateButton manifest={manifest}/>}
                bottomColOneRight={
                    <ActionsDropdownButton
                        {...tableState}
                        {...tableActions}
                        manifest={manifest}
                    />
                }
                bottomColTwoRight={
                    <CustomPagination
                        {...tableState}
                        {...tableActions}
                        manifest={manifest}
                    />
                }
            />
            <CustomTable
                {...tableState}
                {...tableActions}
                columns={columns}
                manifest={manifest}
            />
        </React.Fragment>
    )
};

export default TransferList;

