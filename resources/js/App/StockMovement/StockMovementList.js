import React from 'react';
import useListState from "../../Hooks/useListState";
import manifest from "./__manifest__.json";
import TableCreateButton from "../../components/TableButtons/TableCreateButton";
import ControlPanel from "../../components/ControlPanel";
import ActionsDropdownButton from "../../components/TableButtons/ActionsDropdownButton";
import CustomTable from "../../components/CustomTable";
import TableSearchInput from "../../components/TableSearchInput";
import CustomPagination from "../../components/CustomPagination";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";

const StockMovementList = () => {
    const [tableState, tableActions, columns] = useListState(manifest, [
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
        <React.Fragment>
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
        </React.Fragment>
    )
};

export default StockMovementList;

