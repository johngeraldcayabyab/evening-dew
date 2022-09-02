import React from 'react';
import useListHook from "../../Hooks/useListHook";
import manifest from "./__manifest__.json";
import TableCreateButton from "../../Components/TableButtons/TableCreateButton";
import ControlPanel from "../../Components/ControlPanel";
import CustomTable from "../../Components/CustomTable";
import ActionsDropdownButton from "../../Components/TableButtons/ActionsDropdownButton";
import CustomPagination from "../../Components/CustomPagination";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {TableContextProvider} from "../../Contexts/TableContext";
import {DATE_RANGE, SEARCH} from "../../consts";

const AddressTable = () => {
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
                    title: 'Address Name',
                    dataIndex: 'address_name',
                    key: 'address_name',
                    sorter: true,
                    filter: SEARCH,
                },
                {
                    title: 'Address',
                    dataIndex: 'address',
                    key: 'address',
                    sorter: true,
                    filter: SEARCH,
                },
                {
                    title: 'Type',
                    dataIndex: 'type',
                    key: 'type',
                    sorter: true,
                    filter: SEARCH,
                },
                {
                    title: 'Country',
                    dataIndex: 'country',
                    key: 'country',
                    sorter: true,
                    filter: SEARCH,
                    render: (text, record) => {
                        if (record.country) {
                            return record.country.country_name;
                        }
                        return null;
                    }
                },
                {
                    title: 'City',
                    dataIndex: 'city',
                    key: 'city',
                    sorter: true,
                    filter: SEARCH,
                    render: (text, record) => {
                        if (record.city) {
                            return record.city.name;
                        }
                        return null;
                    }
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

export default AddressTable;
