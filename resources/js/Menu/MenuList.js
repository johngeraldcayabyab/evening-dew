import React from 'react';
import useListState from "../Hooks/useListState";
import manifest from "./__manifest__.json";
import TableCreateButton from "../components/ActionButtons/TableCreateButton";
import ControlPanel from "../components/ControlPanel";
import ActionsDropdownButton from "../components/ActionButtons/ActionsDropdownButton";
import CustomTable from "../components/CustomTable";
import TableSearchInput from "../components/TableSearchInput";

const MenuList = () => {
    const [tableState, tableActions] = useListState(manifest, [
        {
            title: 'Label',
            dataIndex: 'label',
            key: 'label',
        },
        {
            title: 'Url',
            dataIndex: 'url',
            key: 'url',
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
            />
            <CustomTable
                {...tableState}
                {...tableActions}
                manifest={manifest}
            />
        </React.Fragment>
    )
};

export default MenuList;

