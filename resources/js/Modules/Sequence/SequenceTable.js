import React from 'react';
import useListHook from "../../Hooks/useListHook";
import manifest from "./__manifest__.json";
import TableCreateButton from "../../Components/TableButtons/TableCreateButton";
import ControlPanel from "../../Components/ControlPanel";
import ActionsDropdownButton from "../../Components/TableButtons/ActionsDropdownButton";
import CustomTable from "../../Components/CustomTable";
import TableSearchInput from "../../Components/TableSearchInput";
import CustomPagination from "../../Components/CustomPagination";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {TableContextProvider} from "../../Contexts/TableContext";

const SequenceTable = () => {
    const [tableState, tableActions] = useListHook(manifest);
    return (
        <TableContextProvider value={{
            manifest: manifest,
            tableState: tableState,
            tableActions: tableActions,
            columns: [
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                    sorter: true,
                    searchFilter: true,
                },
                {
                    title: 'Sequence Code',
                    dataIndex: 'sequence_code',
                    key: 'sequence_code',
                    sorter: true,
                    searchFilter: true,
                },
                {
                    title: 'Implementation',
                    dataIndex: 'implementation',
                    key: 'implementation',
                    sorter: true,
                    searchFilter: true,
                },
                {
                    title: 'Prefix',
                    dataIndex: 'prefix',
                    key: 'prefix',
                    sorter: true,
                    searchFilter: true,
                },
                {
                    title: 'Suffix',
                    dataIndex: 'suffix',
                    key: 'suffix',
                    sorter: true,
                    searchFilter: true,
                },
                {
                    title: 'Sequence Size',
                    dataIndex: 'sequence_size',
                    key: 'sequence_size',
                    sorter: true,
                    searchFilter: true,
                },
                {
                    title: 'Step',
                    dataIndex: 'step',
                    key: 'step',
                    sorter: true,
                    searchFilter: true,
                },
                {
                    title: 'Next Number',
                    dataIndex: 'next_number',
                    key: 'next_number',
                    sorter: true,
                    searchFilter: true,
                },
                {
                    title: 'Created At',
                    dataIndex: 'created_at',
                    key: 'created_at',
                    sorter: true,
                },
            ]
        }}>
            <ControlPanel
                topColOneLeft={<CustomBreadcrumb/>}
                topColTwoRight={<TableSearchInput/>}
                bottomColOneLeft={<TableCreateButton/>}
                bottomColOneRight={<ActionsDropdownButton/>}
                bottomColTwoRight={<CustomPagination/>}
            />
            <CustomTable/>
        </TableContextProvider>
    )
};

export default SequenceTable;

