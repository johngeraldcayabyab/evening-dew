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

const RegionList = () => {
    const [tableState, tableActions] = useListHook(manifest);
    return (
        <ListContextProvider value={{
            manifest: manifest,
            tableState: tableState,
            tableActions: tableActions,
            columns: [
                {
                    title: 'Region Name',
                    dataIndex: 'region_name',
                    key: 'region_name',
                    sorter: true,
                    searchFilter: true,
                },
                {
                    title: 'Region Code',
                    dataIndex: 'region_code',
                    key: 'region_code',
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
        }}>
            <ControlPanel
                topColOneLeft={<CustomBreadcrumb/>}
                topColTwoRight={<TableSearchInput/>}
                bottomColOneLeft={<TableCreateButton/>}
                bottomColOneRight={<ActionsDropdownButton/>}
                bottomColTwoRight={<CustomPagination/>}
            />
            <CustomTable/>
        </ListContextProvider>
    )
};

export default RegionList;
