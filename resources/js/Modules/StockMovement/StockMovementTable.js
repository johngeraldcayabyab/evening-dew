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
import {DATE_RANGE, SEARCH} from "../../consts";

const StockMovementTable = () => {
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
                },
                {
                    title: 'Source',
                    dataIndex: 'source',
                    key: 'source',
                    sorter: true,
                    filter: SEARCH,
                },
                {
                    title: 'Product',
                    dataIndex: 'product',
                    key: 'product',
                    sorter: true,
                    filter: SEARCH,
                    render: (text, record) => {
                        if (record.product) {
                            return record.product.name;
                        }
                        return null;
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
                    title: 'Quantity Done',
                    dataIndex: 'quantity_done',
                    key: 'quantity_done',
                    sorter: true,
                    filter: SEARCH,
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

export default StockMovementTable;

