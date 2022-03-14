import React from 'react';
import useListState from "../../Hooks/useListState";
import manifest from "./__manifest__.json";
import TableCreateButton from "../../components/TableButtons/TableCreateButton";
import ControlPanel from "../../components/ControlPanel";
import CustomTable from "../../components/CustomTable";
import ActionsDropdownButton from "../../components/TableButtons/ActionsDropdownButton";
import TableSearchInput from "../../components/TableSearchInput";
import CustomPagination from "../../components/CustomPagination";

const OperationTypeList = () => {
    const [tableState, tableActions, columns] = useListState(manifest, [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                sorter: true,
                searchFilter: true,
            },
            {
                title: 'Warehouse',
                dataIndex: 'warehouse',
                key: 'warehouse',
                sorter: true,
                searchFilter: true,
                render: (text, record) => {
                    if (record.warehouse) {
                        return record.warehouse.name;
                    }
                    return null;
                }
            },
            {
                title: 'Reference Sequence',
                dataIndex: 'reference_sequence',
                key: 'reference_sequence',
                sorter: true,
                searchFilter: true,
                render: (text, record) => {
                    if (record.reference_sequence) {
                        return record.reference_sequence.name;
                    }
                    return null;
                }
            },
            {
                title: 'Created At',
                dataIndex: 'created_at',
                key: 'created_at',
                sorter: true,
            }
        ]
    );

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

export default OperationTypeList;
