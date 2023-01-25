import React from 'react';
import useListHook from "../../Hooks/useListHook";
import TableCreateButton from "../../Components/TableButtons/TableCreateButton";
import ControlPanel from "../../Components/ControlPanel";
import ActionsDropdownButton from "../../Components/TableButtons/ActionsDropdownButton";
import CustomTable from "../../Components/CustomTable";
import CustomPagination from "../../Components/CustomPagination";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {TableContextProvider} from "../../Contexts/TableContext";
import {DATE_RANGE, SEARCH} from "../../consts";
import GlobalSearchFilter from "../../Components/TableFilters/GlobalSearchFilter"
import SalesOrderLineManifest from "./SalesOrderLineManifest"


const SalesOrderLineTable = () => {
    const [tableState, tableActions] = useListHook(SalesOrderLineManifest);
    return (
        <TableContextProvider value={{
            manifest: SalesOrderLineManifest,
            tableState: tableState,
            tableActions: tableActions,
            columnSelection: true,
            columns: [
                {
                    title: 'Shipping date',
                    dataIndex: 'shipping_date',
                    key: 'shipping_date',
                    sorter: true,
                    filter: DATE_RANGE,
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
                        return '';
                    },
                    isGlobalSearch: true,
                },
                {
                    title: 'Quantity',
                    dataIndex: 'quantity',
                    key: 'quantity',
                    sorter: true,
                    filter: SEARCH,
                    isGlobalSearch: true,
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

export default SalesOrderLineTable;

