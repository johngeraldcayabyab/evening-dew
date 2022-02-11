import React from 'react';
import useListState from "../Hooks/useListState";
import manifest from "./__manifest__.json";
import TableCreateButton from "../components/TableButtons/TableCreateButton";
import ControlPanel from "../components/ControlPanel";
import CustomTable from "../components/CustomTable";
import ActionsDropdownButton from "../components/TableButtons/ActionsDropdownButton";
import CustomPagination from "../components/CustomPagination";
import TableSearchInput from "../components/TableSearchInput";

const AddressList = () => {
    const [tableState, tableActions, columns] = useListState(manifest, [
            {
                title: 'Country Name',
                dataIndex: 'address_name',
                key: 'address_name',
                sorter: true,
                searchFilter: true,
            },
            {
                title: 'Street 1',
                dataIndex: 'street_1',
                key: 'street_1',
                sorter: true,
                searchFilter: true,
            },
            {
                title: 'Street 2',
                dataIndex: 'street_2',
                key: 'street_2',
                sorter: true,
                searchFilter: true,
            },
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
                sorter: true,
                searchFilter: true,
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

export default AddressList;
