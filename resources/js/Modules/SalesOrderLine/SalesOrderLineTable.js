import React from 'react';
import useListHook from "../../Hooks/useListHook";
import manifest from "./__manifest__.json";
import TableCreateButton from "../../Components/TableButtons/TableCreateButton";
import ControlPanel from "../../Components/ControlPanel";
import ActionsDropdownButton from "../../Components/TableButtons/ActionsDropdownButton";
import CustomTable from "../../Components/CustomTable";
import CustomPagination from "../../Components/CustomPagination";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {TableContextProvider} from "../../Contexts/TableContext";
import {COLUMN_SELECTION, DATE_RANGE, SEARCH} from "../../consts";
import {selectTimeOptions} from "../../Helpers/object";

const SalesOrderLineTable = () => {
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
                    title: 'Shipping date',
                    dataIndex: 'sales_order',
                    key: 'sales_order',
                    sorter: true,
                    filter: DATE_RANGE,
                    render: (text, record) => {
                        if (!record.sales_order || typeof record.sales_order !== 'object') {
                            return '';
                        }
                        return record.sales_order.shipping_date;
                    }
                },
                {
                    title: 'Select time',
                    dataIndex: 'select_time',
                    key: 'select_time',
                    sorter: true,
                    filter: DATE_RANGE,
                    render: (text, record) => {
                        if (!record.sales_order || typeof record.sales_order !== 'object') {
                            return '';
                        }


                        let selectTime = record.sales_order.select_time;
                        if (!selectTime) {
                            return '';
                        }
                        const timeOptions = selectTimeOptions();
                        const timeOption = timeOptions.find((timeOption) => {
                            return timeOption.value === selectTime ? timeOption.value : '';
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
                    title: 'Product',
                    dataIndex: 'product',
                    key: 'product',
                    sorter: true,
                    filter: SEARCH,
                    render: (text, record) => {
                        return record.product.name;
                    }
                },
                {
                    title: 'Quantity',
                    dataIndex: 'quantity',
                    key: 'quantity',
                    sorter: true,
                    filter: SEARCH,
                },
                {
                    title: 'Created At',
                    dataIndex: 'created_at',
                    key: 'created_at',
                    sorter: true,
                    filter: DATE_RANGE,
                    hidden: true,
                },
                {
                    title: '',
                    dataIndex: COLUMN_SELECTION,
                    key: COLUMN_SELECTION,
                    filter: COLUMN_SELECTION,
                }
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

export default SalesOrderLineTable;

