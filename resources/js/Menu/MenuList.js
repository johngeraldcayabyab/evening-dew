import React from 'react';
import useListState from "../Hooks/useListState";
import manifest from "./__manifest__.json";
import TableCreateButton from "../components/ActionButtons/TableCreateButton";
import ControlPanel from "../components/ControlPanel";
import ActionsDropdownButton from "../components/ActionButtons/ActionsDropdownButton";
import CustomTable from "../components/CustomTable";
import TableSearchInput from "../components/TableSearchInput";
import CustomPagination from "../components/CustomPagination";

const MenuList = () => {
    const [tableState, tableActions, columns] = useListState(manifest, [
        {
            title: 'Label',
            dataIndex: 'label',
            key: 'label',
            sorter: true,
        },
        {
            title: 'Url',
            dataIndex: 'url',
            key: 'url',
            sorter: true,
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

export default MenuList;

