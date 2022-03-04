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

const SalesOrderList = () => {
    const [tableState, tableActions, columns] = useListState(manifest, [
        {
            title: 'Number',
            dataIndex: 'number',
            key: 'number',
            sorter: true,
            searchFilter: true,
        },
        {
            title: 'Customer',
            dataIndex: 'customer',
            key: 'customer',
            sorter: true,
            searchFilter: true,
            render: (text, record) => {
                return record.customer.name;
            }
        },
        {
            title: 'Salesperson',
            dataIndex: 'salesperson',
            key: 'salesperson',
            sorter: true,
            searchFilter: true,
            render: (text, record) => {
                return record.salesperson.name;
            }
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

export default SalesOrderList;

