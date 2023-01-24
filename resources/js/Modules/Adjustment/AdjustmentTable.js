import React from 'react';
import useListHook from "../../Hooks/useListHook";
import manifest from "./adjustment_manifest.json";
import TableCreateButton from "../../Components/TableButtons/TableCreateButton";
import ControlPanel from "../../Components/ControlPanel";
import CustomTable from "../../Components/CustomTable";
import ActionsDropdownButton from "../../Components/TableButtons/ActionsDropdownButton";
import CustomPagination from "../../Components/CustomPagination";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {TableContextProvider} from "../../Contexts/TableContext";
import {DATE_RANGE, SEARCH} from "../../consts";
import GlobalSearchFilter from "../../Components/TableFilters/GlobalSearchFilter"

const AdjustmentTable = () => {
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
                    title: 'Number',
                    dataIndex: 'number',
                    key: 'number',
                    sorter: true,
                    filter: SEARCH,
                    isGlobalSearch: true,
                },
                {
                    title: 'Product Category',
                    dataIndex: 'product_category',
                    key: 'product_category',
                    sorter: true,
                    filter: SEARCH,
                    render: (text, record) => {
                        return record.product_category.category;
                    },
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

export default AdjustmentTable;
