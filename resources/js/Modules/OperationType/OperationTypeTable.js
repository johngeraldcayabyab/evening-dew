import React from 'react';
import useListHook from "../../Hooks/useListHook";
import TableCreateButton from "../../Components/TableButtons/TableCreateButton";
import ControlPanel from "../../Components/ControlPanel";
import CustomTable from "../../Components/CustomTable";
import ActionsDropdownButton from "../../Components/TableButtons/ActionsDropdownButton";
import CustomPagination from "../../Components/CustomPagination";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {TableContextProvider} from "../../Contexts/TableContext";
import {DATE_RANGE, SEARCH} from "../../consts";
import GlobalSearchFilter from "../../Components/TableFilters/GlobalSearchFilter"
import OperationTypeManifest from "./OperationTypeManifest"

const OperationTypeTable = () => {
    const [tableState, tableActions] = useListHook(OperationTypeManifest);
    return (
        <TableContextProvider value={{
            manifest: OperationTypeManifest,
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
                    title: 'Warehouse',
                    dataIndex: 'warehouse',
                    key: 'warehouse',
                    sorter: true,
                    filter: SEARCH,
                    render: (text, record) => {
                        if (record.warehouse) {
                            return record.warehouse.name;
                        }
                        return null;
                    },
                    isGlobalSearch: true,
                },
                {
                    title: 'Reference Sequence',
                    dataIndex: 'reference_sequence',
                    key: 'reference_sequence',
                    sorter: true,
                    filter: SEARCH,
                    render: (text, record) => {
                        if (record.reference_sequence) {
                            return record.reference_sequence.name;
                        }
                        return null;
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

export default OperationTypeTable;
