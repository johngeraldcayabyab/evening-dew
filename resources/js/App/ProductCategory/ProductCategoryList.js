import React from 'react';
import useListState from "../../Hooks/useListState";
import manifest from "./__manifest__.json";
import TableCreateButton from "../../components/TableButtons/TableCreateButton";
import ControlPanel from "../../components/ControlPanel";
import ActionsDropdownButton from "../../components/TableButtons/ActionsDropdownButton";
import CustomTable from "../../components/CustomTable";
import TableSearchInput from "../../components/TableSearchInput";
import CustomPagination from "../../components/CustomPagination";

const ProductCategoryList = () => {
    const [tableState, tableActions, columns] = useListState(manifest, [
        {
            title: 'Category',
            dataIndex: 'parents',
            key: 'category',
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

export default ProductCategoryList;

