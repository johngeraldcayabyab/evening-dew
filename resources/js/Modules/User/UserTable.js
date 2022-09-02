import React, {useState} from 'react';
import useListHook from "../../Hooks/useListHook";
import manifest from "./__manifest__.json";
import TableCreateButton from "../../Components/TableButtons/TableCreateButton";
import ControlPanel from "../../Components/ControlPanel";
import ActionsDropdownButton from "../../Components/TableButtons/ActionsDropdownButton";
import CustomTable from "../../Components/CustomTable";
import CustomPagination from "../../Components/CustomPagination";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {TableContextProvider} from "../../Contexts/TableContext";
import {Col, Row} from "antd";
import KanbanTablePicker from "../../Components/KanbanTablePicker";
import {DATE_RANGE, KANBAN, SEARCH, TABLE} from "../../consts";
import Cardination from "../../Components/Cardination";

const UserTable = () => {
    const [tableState, tableActions] = useListHook(manifest);
    const [dataState, setDataState] = useState({
        mode: KANBAN
    });
    return (
        <TableContextProvider value={{
            manifest: manifest,
            tableState: tableState,
            tableActions: tableActions,
            dataState: dataState,
            setDataState: setDataState,
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
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                    sorter: true,
                    filter: SEARCH,
                },
                {
                    title: 'Email',
                    dataIndex: 'email',
                    key: 'email',
                    sorter: true,
                    filter: SEARCH,
                },
                {
                    title: 'Created At',
                    dataIndex: 'created_at',
                    key: 'created_at',
                    sorter: true,
                    filter: DATE_RANGE,
                },
            ],
            kanban: {
                selected_fields: ['name', 'avatar', 'email'],
                title: 'name',
                avatar: 'avatar',
                description: [
                    {
                        key: 'email',
                        render: (record) => {
                            return record.email;
                        }
                    },
                ]
            }
        }}>
            <ControlPanel
                topColOneLeft={<CustomBreadcrumb/>}
                topColTwoRight={''}
                bottomColOneLeft={<TableCreateButton/>}
                bottomColOneRight={<ActionsDropdownButton/>}
                bottomColTwoRight={
                    <Row align={'right'}>
                        <Col span={20}><CustomPagination/></Col>
                        <Col span={4}><KanbanTablePicker/></Col>
                    </Row>
                }
            />
            {dataState.mode === TABLE ? <CustomTable/> : null}
            {dataState.mode === KANBAN ? <Cardination/> : null}
        </TableContextProvider>
    )
};

export default UserTable;

