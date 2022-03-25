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

const MeasurementList = () => {
    const [tableState, tableActions] = useListHook(manifest);
    return (
        <ListContextProvider value={{
            manifest: manifest,
            tableState: tableState,
            tableActions: tableActions,
            columns: [
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
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
                    title: 'Ratio',
                    dataIndex: 'ratio',
                    key: 'ratio',
                    sorter: true,
                    searchFilter: true,
                },
                {
                    title: 'Rounding Precision',
                    dataIndex: 'rounding_precision',
                    key: 'rounding_precision',
                    sorter: true,
                    searchFilter: true,
                },
                {
                    title: 'Category',
                    dataIndex: 'measurement_category',
                    key: 'measurement_category',
                    sorter: true,
                    searchFilter: true,
                    render: (text, record) => {
                        return record.measurement_category.name;
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

export default MeasurementList;
