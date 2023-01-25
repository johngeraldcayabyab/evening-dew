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
import LocationManifest from "./LocationManifest"

const LocationTable = () => {
    const [tableState, tableActions] = useListHook(LocationManifest);
    return (
        <TableContextProvider value={{
            manifest: LocationManifest,
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
                    dataIndex: 'parents',
                    key: 'name',
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

export default LocationTable;

