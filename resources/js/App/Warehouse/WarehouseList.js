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
import {ListContextProvider} from "../../Contexts/ListContext";

const WarehouseList = () => {
    const [tableState, tableActions, columns] = useListHook(manifest, [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            searchFilter: true,
        },
        {
            title: 'Short Name',
            dataIndex: 'short_name',
            key: 'short_name',
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
        <ListContextProvider value={{tableState: tableState}}>
            <ControlPanel
                topColOneLeft={<CustomBreadcrumb/>}
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
        </ListContextProvider>
    )
};

export default WarehouseList;

