import React from 'react';
import useListHook from "../../Hooks/useListHook";
import manifest from "./__manifest__.json";
import TableCreateButton from "../../Components/TableButtons/TableCreateButton";
import ControlPanel from "../../Components/ControlPanel";
import ActionsDropdownButton from "../../Components/TableButtons/ActionsDropdownButton";
import CustomTable from "../../Components/CustomTable";
import CustomPagination from "../../Components/CustomPagination";
import Text from "antd/es/typography/Text";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {TableContextProvider} from "../../Contexts/TableContext";
import {COLUMN_SELECTION, DATE_RANGE, SEARCH} from "../../consts";
import {Tag} from "antd";
import {titleCase} from "../../Helpers/string";
import CustomStepsChanger from "../CustomStepsChanger";

const ShopifyTable = () => {
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
                    title: 'Number',
                    dataIndex: 'number',
                    key: 'number',
                    sorter: true,
                    filter: SEARCH,
                    render: (text, record) => {
                        return <Text strong><span style={{fontSize: '12px'}}>{record.number}</span></Text>
                    }
                },
                {
                    title: 'Customer',
                    dataIndex: 'customer',
                    key: 'customer',
                    sorter: true,
                    filter: SEARCH,
                    render: (text, record) => {
                        return record.customer.name;
                    }
                },
                {
                    title: 'Shipping Method',
                    dataIndex: 'shipping_method',
                    key: 'shipping_method',
                    sorter: true,
                    filter: SEARCH,
                    hidden: true,
                    render: (text, record) => {
                        return <Tag color={'default'}>{titleCase(record.shipping_method)}</Tag>;
                    }
                },
                {
                    title: 'Salesperson',
                    dataIndex: 'salesperson',
                    key: 'salesperson',
                    sorter: true,
                    filter: SEARCH,
                    render: (text, record) => {
                        return record.salesperson.name;
                    }
                },
                {
                    title: 'Shipping Date',
                    dataIndex: 'shipping_date',
                    key: 'shipping_date',
                    sorter: true,
                    filter: DATE_RANGE,
                },
                {
                    title: 'Quotation Date',
                    dataIndex: 'quotation_date',
                    key: 'quotation_date',
                    sorter: true,
                    filter: DATE_RANGE,
                },
                {
                    title: 'Status',
                    dataIndex: 'steps',
                    key: 'steps',
                    sorter: true,
                    render: (text, record) => (<CustomStepsChanger text={text} record={record}/>),
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
                // bottomColOneLeft={<TableCreateButton/>}
                bottomColOneRight={<ActionsDropdownButton/>}
                bottomColTwoRight={<CustomPagination/>}
            />
            <CustomTable/>
        </TableContextProvider>
    )
};

export default ShopifyTable;

