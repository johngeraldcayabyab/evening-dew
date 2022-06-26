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

const SameDayTable = () => {
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
                    title: 'Delivery Address',
                    dataIndex: 'delivery_address',
                    key: 'delivery_address',
                    sorter: true,
                    filter: SEARCH,
                },
                {
                    title: 'Delivery Phone',
                    dataIndex: 'delivery_phone',
                    key: 'delivery_phone',
                    sorter: true,
                    filter: SEARCH,
                },
                {
                    title: 'Shipping Method',
                    dataIndex: 'Shipping Method',
                    key: 'shipping_method',
                    sorter: true,
                    filter: SEARCH,
                },
                {
                    title: 'SKUS',
                    dataIndex: 'sales_order_lines',
                    key: 'sales_order_lines',
                    // sorter: true,
                    // filter: SEARCH,
                    render: (text, record) => {
                        // const  source = record.source ? record.source.name : '';
                        // if (source === 'Shopify') {
                        //     return <Tag color={'success'}>{source}</Tag>;
                        // }

                        return record.sales_order_lines.map((salesOrderLine) => {
                            if (salesOrderLine.product.internal_reference) {
                                return <Tag color={'default'}>{salesOrderLine.product.internal_reference}</Tag>;
                            }
                            return <span></span>;
                        });

                        return <Tag color={'default'}>{source}</Tag>;
                    }
                },


                {
                    title: 'Salesperson',
                    dataIndex: 'salesperson',
                    key: 'salesperson',
                    sorter: true,
                    filter: SEARCH,
                    hidden: true,
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
                    hidden: true,
                },
                {
                    title: 'Quotation Date',
                    dataIndex: 'quotation_date',
                    key: 'quotation_date',
                    sorter: true,
                    filter: DATE_RANGE,
                    hidden: true,
                },
                {
                    title: 'Source',
                    dataIndex: 'source',
                    key: 'source',
                    sorter: true,
                    filter: SEARCH,
                    render: (text, record) => {
                        const source = record.source ? record.source.name : '';
                        if (source === 'Shopify') {
                            return <Tag color={'success'}>{source}</Tag>;
                        }
                        return <Tag color={'default'}>{source}</Tag>;
                    }
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

export default SameDayTable;

