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
import {Input, Tag} from "antd"
import GlobalSearchFilter from "../../Components/TableFilters/GlobalSearchFilter"

const AccessRightTable = () => {
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
                    hidden: true,
                },
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                    sorter: true,
                    filter: SEARCH,
                    isGlobalSearch: true,
                },
                {
                    title: 'Group',
                    dataIndex: 'group',
                    key: 'group',
                    sorter: true,
                    filter: SEARCH,
                    isGlobalSearch: true,
                    render: (text, record) => {
                        if (record.group) {
                            return record.group.name;
                        }
                        return null;
                    }
                },
                {
                    title: 'Read Access',
                    dataIndex: 'read_access',
                    key: 'read_access',
                    sorter: true,
                    filter: SEARCH,
                    render: (text, record) => {
                        if (record.read_access) {
                            return <Tag color="green">Yes</Tag>
                        }
                        return <Tag color="red">No</Tag>
                    }
                },
                {
                    title: 'Write Access',
                    dataIndex: 'write_access',
                    key: 'write_access',
                    sorter: true,
                    filter: SEARCH,
                    render: (text, record) => {
                        if (record.write_access) {
                            return <Tag color="green">Yes</Tag>
                        }
                        return <Tag color="red">No</Tag>
                    }
                },
                {
                    title: 'Create Access',
                    dataIndex: 'create_access',
                    key: 'create_access',
                    sorter: true,
                    filter: SEARCH,
                    render: (text, record) => {
                        if (record.create_access) {
                            return <Tag color="green">Yes</Tag>
                        }
                        return <Tag color="red">No</Tag>
                    }
                },
                {
                    title: 'Delete Access',
                    dataIndex: 'delete_access',
                    key: 'delete_access',
                    sorter: true,
                    filter: SEARCH,
                    render: (text, record) => {
                        if (record.delete_access) {
                            return <Tag color="green">Yes</Tag>
                        }
                        return <Tag color="red">No</Tag>
                    }
                },
            ]
        }}>
            <ControlPanel
                topColOneLeft={<CustomBreadcrumb/>}
                topColTwoRight={<GlobalSearchFilter/>}
                bottomColOneLeft={<TableCreateButton/>}
                bottomColOneRight={<ActionsDropdownButton/>}
                bottomColTwoRight={<CustomPagination/>}
            />
            <CustomTable/>
        </TableContextProvider>
    )
};

export default AccessRightTable;
