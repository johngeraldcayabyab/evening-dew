import React from 'react';
import useListState from "../../Hooks/useListState";
import manifest from "./__manifest__.json";
import TableCreateButton from "../../components/TableButtons/TableCreateButton";
import ControlPanel from "../../components/ControlPanel";
import ActionsDropdownButton from "../../components/TableButtons/ActionsDropdownButton";
import CustomTable from "../../components/CustomTable";
import TableSearchInput from "../../components/TableSearchInput";
import CustomPagination from "../../components/CustomPagination";

const SequenceList = () => {
    const [tableState, tableActions, columns] = useListState(manifest, [
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
    ]);
    return (
        <React.Fragment>
            <ControlPanel
                topColTwoRight={
                    <TableSearchInput
                        {...tableState}
                        {...tableActions}
                        manifest={manifest}
                    />
                }
                bottomColOneLeft={<TableCreateButton manifest={manifest}/>}
                bottomColOneRight={
                    <ActionsDropdownButton
                        {...tableState}
                        {...tableActions}
                        manifest={manifest}
                    />
                }
                bottomColTwoRight={
                    <CustomPagination
                        {...tableState}
                        {...tableActions}
                        manifest={manifest}
                    />
                }
            />
            <CustomTable
                {...tableState}
                {...tableActions}
                columns={columns}
                manifest={manifest}
            />
        </React.Fragment>
    )
};

export default SequenceList;
