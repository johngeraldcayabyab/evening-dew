import React from 'react';
import useListHook from "../../Hooks/useListHook";
import manifest from "./__manifest__.json";
import TableCreateButton from "../../Components/TableButtons/TableCreateButton";
import ControlPanel from "../../Components/ControlPanel";
import CustomTable from "../../Components/CustomTable";
import ActionsDropdownButton from "../../Components/TableButtons/ActionsDropdownButton";
import CustomPagination from "../../Components/CustomPagination";
import TableSearchInput from "../../Components/TableSearchInput";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {ListContextProvider} from "../../Contexts/ListContext";

const AddressList = () => {
    const [tableState, tableActions, columns] = useListHook(manifest, [
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
        <ListContextProvider value={{
            manifest: manifest,
            tableState: tableState,
            tableActions: tableActions,
        }}>
            <ControlPanel
                topColOneLeft={<CustomBreadcrumb/>}
                topColTwoRight={
                    <TableSearchInput/>
                }
                bottomColOneLeft={<TableCreateButton/>}
                bottomColOneRight={<ActionsDropdownButton/>}
                bottomColTwoRight={<CustomPagination/>}
            />
            <CustomTable columns={columns}/>
        </ListContextProvider>
    )
};

export default AddressList;
