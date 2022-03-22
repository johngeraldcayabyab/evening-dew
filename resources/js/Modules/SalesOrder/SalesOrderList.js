import React from 'react';
import useListHook from "../../Hooks/useListHook";
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
import {ListContextProvider} from "../../Contexts/ListContext";

const SalesOrderList = () => {
    const [tableState, tableActions, columns] = useListHook(manifest, [
        {
            title: 'Number',
            dataIndex: 'number',
            key: 'number',
            sorter: true,
            searchFilter: true,
            render: (text, record) => {
                return <Text strong><span style={{fontSize: '12px'}}>{record.number}</span></Text>
            }
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
        <ListContextProvider value={{
            manifest: manifest,
            tableState: tableState,
            tableActions: tableActions,
        }}>
            <ControlPanel
                topColOneLeft={<CustomBreadcrumb/>}
                topColTwoRight={
                    <TableSearchInput/>
                }
                bottomColOneLeft={<TableCreateButton/>}
                bottomColOneRight={<ActionsDropdownButton/>}
                bottomColTwoRight={<CustomPagination/>}
            />
            <CustomTable columns={columns}/>
        </ListContextProvider>
    )
};

export default SalesOrderList;

