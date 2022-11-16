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
import GlobalSearchFilter from "../../Components/TableFilters/GlobalSearchFilter"

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
                    hidden: true,
                },
                {
                    title: 'Reference',
                    dataIndex: 'reference',
                    key: 'reference',
                    sorter: true,
                    filter: SEARCH,
                    isGlobalSearch: true,
                },
                {
                    title: 'Source',
                    dataIndex: 'source',
                    key: 'source',
                    sorter: true,
                    filter: SEARCH,
                    isGlobalSearch: true,
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
                    },
                    isGlobalSearch: true,
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
                    },
                    isGlobalSearch: true,
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
                    },
                    isGlobalSearch: true,
                },
                {
                    title: 'Quantity Done',
                    dataIndex: 'quantity_done',
                    key: 'quantity_done',
                    sorter: true,
                    filter: SEARCH,
                    isGlobalSearch: true,
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
                topColTwoRight={<GlobalSearchFilter/>}
                bottomColOneLeft={<TableCreateButton/>}
                bottomColOneRight={<ActionsDropdownButton/>}
                bottomColTwoRight={<CustomPagination/>}
            />
            <CustomTable/>
        </TableContextProvider>
    )
};

export default StockMovementTable;

