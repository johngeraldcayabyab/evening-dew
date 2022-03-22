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

const StockMovementList = () => {
    const [tableState, tableActions, columns] = useListHook(manifest, [
        {
            title: 'Reference',
            dataIndex: 'reference',
            key: 'reference',
            sorter: true,
            searchFilter: true,
        },
        {
            title: 'Source',
            dataIndex: 'source',
            key: 'source',
            sorter: true,
            searchFilter: true,
        },
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
            sorter: true,
            searchFilter: true,
            render: (text, record) => {
                if (record.product) {
                    return record.product.name;
                }
                return null;
            }
        },
        {
            title: 'From',
            dataIndex: 'source_location',
            key: 'source_location',
            sorter: true,
            searchFilter: true,
            render: (text, record) => {
                if (record.source_location) {
                    return record.source_location.parents;
                }
                return null;
            }
        },
        {
            title: 'To',
            dataIndex: 'destination_location',
            key: 'destination_location',
            sorter: true,
            searchFilter: true,
            render: (text, record) => {
                if (record.destination_location) {
                    return record.destination_location.parents;
                }
                return null;
            }
        },
        {
            title: 'Quantity Done',
            dataIndex: 'quantity_done',
            key: 'quantity_done',
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

export default StockMovementList;
