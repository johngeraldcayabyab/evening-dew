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
import {TableContextProvider} from "../../Contexts/TableContext";

const ProductTable = () => {
    const [tableState, tableActions] = useListHook(manifest);
    return (
        <TableContextProvider value={{
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
                    title: 'Internal Reference',
                    dataIndex: 'internal_reference',
                    key: 'internal_reference',
                    sorter: true,
                    searchFilter: true,
                },
                {
                    title: 'Sales Price',
                    dataIndex: 'sales_price',
                    key: 'sales_price',
                    sorter: true,
                    searchFilter: true,
                },
                {
                    title: 'Cost',
                    dataIndex: 'cost',
                    key: 'cost',
                    sorter: true,
                    searchFilter: true,
                },
                {
                    title: 'Measurement',
                    dataIndex: 'measurement',
                    key: 'measurement',
                    sorter: true,
                    searchFilter: true,
                    render: (text, record) => {
                        return record.measurement.name;
                    }
                },
                {
                    title: 'Product Category',
                    dataIndex: 'product_category',
                    key: 'product_category',
                    sorter: true,
                    searchFilter: true,
                    render: (text, record) => {
                        return record.product_category.category;
                    }
                },
                {
                    title: 'Quantity',
                    dataIndex: 'quantity',
                    key: 'quantity',
                    sorter: true,
                    searchFilter: true,
                },
                {
                    title: 'Created At',
                    dataIndex: 'created_at',
                    key: 'created_at',
                    sorter: true,
                },
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
        </TableContextProvider>
    )
};

export default ProductTable;

