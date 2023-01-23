import React, {useEffect} from 'react';
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
import {uuidv4} from "../../Helpers/string";
import CustomStepsChanger from "../CustomStepsChanger";
import TableCreateButton from "../../Components/TableButtons/TableCreateButton";


const SmNorthTable = () => {
    const [tableState, tableActions] = useListHook(manifest);
    useEffect(() => {
        window.Echo.channel('sm-north').listen('SmNorthPaidEvent', function (data) {
            let audio = new Audio("/audio/message.mp3");
            audio.play();
            tableActions.renderData(tableState.params);
        });
    }, []);

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
                    title: 'Pickup Time',
                    dataIndex: 'pickup_time',
                    key: 'pickup_time',
                    sorter: true,
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
                    title: 'Quotation Date',
                    dataIndex: 'quotation_date',
                    key: 'quotation_date',
                    sorter: true,
                    filter: DATE_RANGE,
                    hidden: true,
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
                bottomColOneLeft={<TableCreateButton/>}
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

export default SmNorthTable;

