import React from 'react';
import useListHook from "../../Hooks/useListHook";
import manifest from "./__manifest__.json";
import ControlPanel from "../../Components/ControlPanel";
import ActionsDropdownButton from "../../Components/TableButtons/ActionsDropdownButton";
import CustomTable from "../../Components/CustomTable";
import CustomPagination from "../../Components/CustomPagination";
import Text from "antd/es/typography/Text";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {TableContextProvider} from "../../Contexts/TableContext";
import {DATE_RANGE, SEARCH} from "../../consts";
import {Tag} from "antd";
import {selectTimeOptions} from "../../Helpers/object";
import {uuidv4} from "../../Helpers/string";
import CustomStepsChanger from "../CustomStepsChanger";

const SameDayTable = () => {
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
                    render: (text, record) => {
                        if (record.shipping_method === 'pickup') {
                            return <Tag>Pickup</Tag>
                        }
                        return record.delivery_address;
                    }
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
                    dataIndex: 'shipping_method',
                    key: 'shipping_method',
                    sorter: true,
                    filter: SEARCH,
                },
                {
                    title: 'Delivery Time',
                    dataIndex: 'select_time',
                    key: 'select_time',
                    // filter: SELECT,
                    render: (text, record) => {
                        if (!record.select_time) {
                            return '';
                        }
                        const timeOptions = selectTimeOptions();
                        const timeOption = timeOptions.find((timeOption) => {
                            return timeOption.value === record.select_time ? timeOption.value : '';
                        });
                        if (typeof timeOption !== 'object') {
                            return '';
                        }
                        if (timeOptions && timeOptions.length > 1) {
                            return timeOption.hasOwnProperty('label') ? timeOption.label : '';
                        }
                        return '';
                    }
                },
                {
                    title: 'SKUS',
                    dataIndex: 'sales_order_lines',
                    key: 'sales_order_lines',
                    hidden: true,
                    render: (text, record) => {
                        return record.sales_order_lines.map((salesOrderLine) => {
                            if (salesOrderLine.product.internal_reference) {
                                return (
                                    <Tag
                                        key={uuidv4()}
                                        color={'default'}
                                    >
                                        {salesOrderLine.product.internal_reference}
                                    </Tag>
                                );
                            }
                            return null;
                        });
                    }
                },
                {
                    title: 'Courier',
                    dataIndex: 'courier',
                    key: 'courier',
                    sorter: true,
                    filter: SEARCH,
                    render: (text, record) => {
                        if (record.courier) {
                            return <Tag
                                color={record.courier.color ? record.courier.color : 'default'}>{record.courier.name}</Tag>;
                        }
                        return null;
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
                    title: 'Notes',
                    dataIndex: 'notes',
                    key: 'notes',
                    sorter: true,
                    filter: SEARCH,
                },
                {
                    title: 'Status',
                    dataIndex: 'steps',
                    key: 'steps',
                    sorter: true,
                    render: (text, record) => (<CustomStepsChanger text={text} record={record}/>),
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
            <CustomTable
                expandable={{
                    defaultExpandAllRows: true,
                    expandedRowKeys: tableState.dataSource.map(o => o.id),
                    expandedRowRender: (record) => {
                        return record.sales_order_lines.map((salesOrderLine) => {
                            if (salesOrderLine.product.internal_reference) {
                                return (
                                    <Tag
                                        key={uuidv4()}
                                        color={'default'}
                                    >
                                        {salesOrderLine.quantity} x {salesOrderLine.product.internal_reference} - {salesOrderLine.product.name}
                                    </Tag>
                                );
                            }
                            return null;
                        });
                    },
                }}
            />
        </TableContextProvider>
    )
};

export default SameDayTable;

