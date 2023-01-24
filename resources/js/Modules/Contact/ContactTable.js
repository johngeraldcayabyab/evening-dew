import React, {useState} from 'react';
import useListHook from "../../Hooks/useListHook";
import manifest from "./contact_manifest.json";
import TableCreateButton from "../../Components/TableButtons/TableCreateButton";
import ControlPanel from "../../Components/ControlPanel";
import CustomTable from "../../Components/CustomTable";
import ActionsDropdownButton from "../../Components/TableButtons/ActionsDropdownButton";
import CustomPagination from "../../Components/CustomPagination";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {TableContextProvider} from "../../Contexts/TableContext";
import {Col, Row} from "antd";
import KanbanTablePicker from "../../Components/KanbanTablePicker";
import {DATE_RANGE, KANBAN, SEARCH, TABLE} from "../../consts";
import Cardination from "../../Components/Cardination";
import GlobalSearchFilter from "../../Components/TableFilters/GlobalSearchFilter"

const ContactTable = () => {
    const [tableState, tableActions] = useListHook(manifest);
    // const [dataState, setDataState] = useState({
    //     mode: KANBAN
    // });
    return (
        <TableContextProvider value={{
            manifest: manifest,
            tableState: tableState,
            tableActions: tableActions,
            // dataState: dataState,
            // setDataState: setDataState,
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
                    title: 'Phone',
                    dataIndex: 'phone',
                    key: 'phone',
                    sorter: true,
                    filter: SEARCH,
                    isGlobalSearch: true,
                },
                {
                    title: 'Email',
                    dataIndex: 'email',
                    key: 'email',
                    sorter: true,
                    filter: SEARCH,
                    isGlobalSearch: true,
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
                selected_fields: ['name', 'avatar', 'phone', 'email'],
                title: 'name',
                avatar: 'avatar',
                description: [
                    {
                        key: 'phone',
                        render: (record) => {
                            return record.phone;
                        }
                    },
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
                topColTwoRight={<GlobalSearchFilter/>}
                bottomColOneLeft={<TableCreateButton/>}
                bottomColOneRight={<ActionsDropdownButton/>}
                bottomColTwoRight={<CustomPagination/>}
                // bottomColTwoRight={
                //     <Row align={'right'}>
                //         <Col span={20}><CustomPagination/></Col>
                //         <Col span={4}><KanbanTablePicker/></Col>
                //     </Row>
                // }
            />
            <CustomTable/>
            {/*{dataState.mode === TABLE ? <CustomTable/> : null}*/}
            {/*{dataState.mode === KANBAN ? <Cardination/> : null}*/}
        </TableContextProvider>
    )
};

export default ContactTable;
