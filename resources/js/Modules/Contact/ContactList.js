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

const ContactList = () => {
    const [tableState, tableActions, columns] = useListHook(manifest, [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                sorter: true,
                searchFilter: true,
            },
            {
                title: 'Phone',
                dataIndex: 'phone',
                key: 'phone',
                sorter: true,
                searchFilter: true,
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
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

export default ContactList;