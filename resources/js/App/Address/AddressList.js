import React from 'react';
import useListState from "../../Hooks/useListState";
import manifest from "./__manifest__.json";
import TableCreateButton from "../../Components/TableButtons/TableCreateButton";
import ControlPanel from "../../Components/ControlPanel";
import CustomTable from "../../Components/CustomTable";
import ActionsDropdownButton from "../../Components/TableButtons/ActionsDropdownButton";
import CustomPagination from "../../Components/CustomPagination";
import TableSearchInput from "../../Components/TableSearchInput";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";

const AddressList = () => {
    const [tableState, tableActions, columns] = useListState(manifest, [
            {
                title: 'Address Name',
                dataIndex: 'address_name',
                key: 'address_name',
                sorter: true,
                searchFilter: true,
            },
            {
                title: 'Street 1',
                dataIndex: 'street_one',
                key: 'street_one',
                sorter: true,
                searchFilter: true,
            },
            {
                title: 'Street 2',
                dataIndex: 'street_two',
                key: 'street_two',
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
                title: 'Country',
                dataIndex: 'country',
                key: 'country',
                sorter: true,
                searchFilter: true,
                render: (text, record) => {
                    if (record.country) {
                        return record.country.country_name;
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
                topColOneLeft={<CustomBreadcrumb tableState={tableState}/>}
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
