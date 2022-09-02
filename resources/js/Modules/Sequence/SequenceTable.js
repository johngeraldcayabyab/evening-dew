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

const SequenceTable = () => {
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
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                    sorter: true,
                    filter: SEARCH,
                },
                {
                    title: 'Sequence Code',
                    dataIndex: 'sequence_code',
                    key: 'sequence_code',
                    sorter: true,
                    filter: SEARCH,
                },
                {
                    title: 'Implementation',
                    dataIndex: 'implementation',
                    key: 'implementation',
                    sorter: true,
                    filter: SEARCH,
                },
                {
                    title: 'Prefix',
                    dataIndex: 'prefix',
                    key: 'prefix',
                    sorter: true,
                    filter: SEARCH,
                },
                {
                    title: 'Suffix',
                    dataIndex: 'suffix',
                    key: 'suffix',
                    sorter: true,
                    filter: SEARCH,
                },
                {
                    title: 'Sequence Size',
                    dataIndex: 'sequence_size',
                    key: 'sequence_size',
                    sorter: true,
                    filter: SEARCH,
                },
                {
                    title: 'Step',
                    dataIndex: 'step',
                    key: 'step',
                    sorter: true,
                    filter: SEARCH,
                },
                {
                    title: 'Next Number',
                    dataIndex: 'next_number',
                    key: 'next_number',
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

export default SequenceTable;

