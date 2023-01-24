import React from 'react';
import useListHook from "../../Hooks/useListHook";
import manifest from "./measurement_manifest.json";
import TableCreateButton from "../../Components/TableButtons/TableCreateButton";
import ControlPanel from "../../Components/ControlPanel";
import CustomTable from "../../Components/CustomTable";
import ActionsDropdownButton from "../../Components/TableButtons/ActionsDropdownButton";
import CustomPagination from "../../Components/CustomPagination";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {TableContextProvider} from "../../Contexts/TableContext";
import {DATE_RANGE, SEARCH} from "../../consts";
import GlobalSearchFilter from "../../Components/TableFilters/GlobalSearchFilter"

const MeasurementTable = () => {
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
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                    sorter: true,
                    filter: SEARCH,
                    isGlobalSearch: true,
                },
                {
                    title: 'Type',
                    dataIndex: 'type',
                    key: 'type',
                    sorter: true,
                    filter: SEARCH,
                    isGlobalSearch: true,
                },
                {
                    title: 'Ratio',
                    dataIndex: 'ratio',
                    key: 'ratio',
                    sorter: true,
                    filter: SEARCH,
                    isGlobalSearch: true,
                },
                {
                    title: 'Rounding Precision',
                    dataIndex: 'rounding_precision',
                    key: 'rounding_precision',
                    sorter: true,
                    filter: SEARCH,
                },
                {
                    title: 'Category',
                    dataIndex: 'measurement_category',
                    key: 'measurement_category',
                    sorter: true,
                    filter: SEARCH,
                    render: (text, record) => {
                        return record.measurement_category.name;
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

export default MeasurementTable;
