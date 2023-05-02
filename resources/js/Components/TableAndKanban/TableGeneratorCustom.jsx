import {
    COLUMN_SELECTION,
    DATE_RANGE,
    DELETE,
    GET,
    HAS_FORM_CREATE,
    HAS_FORM_UPDATE,
    POST,
    SEARCH, SELECT,
    TABLE
} from "../../consts";
import React, {useContext, useEffect, useState} from "react";
import {Button, Col, Row, Table} from "antd";
import useFetchHook from "../../Hooks/useFetchHook";
import {getPayload, getPayloadModule, setPayload, setPayloadModule} from "../../Helpers/localstorage";
import {AppContext} from "../../Contexts/AppContext";
import {Link, useNavigate} from "react-router-dom";
import {TableContextProvider} from "../../Contexts/TableContext";
import ControlPanel from "../ControlPanel"
import CustomBreadcrumb from "../CustomBreadcrumb"
import CustomPagination from "./CustomPagination"
import GlobalSearchFilter from "./TableFilters/GlobalSearchFilter"
import TableCreateButton from "./TableButtons/TableCreateButton"
import ActionsDropdownButton from "./TableButtons/ActionsDropdownButton"
import KanbanTablePicker from "./KanbanTablePicker"
import BooleanTag from "../Typography/BooleanTag"
import SequenceNumber from "../Typography/SequenceNumber"
import {EyeOutlined, SearchOutlined} from "@ant-design/icons"
import ColumnSelectionFilter from "./TableFilters/ColumnSelectionFilter"
import SearchFilter from "./TableFilters/SearchFilter"
import DateRangeFilter from "./TableFilters/DateRangeFilter"
import SelectFilter from "./TableFilters/SelectFilter"

const TableGeneratorCustom = (manifest) => {
    const appContext = useContext(AppContext);
    const useFetch = useFetchHook();
    const navigate = useNavigate();
    const [state, setState] = useState({
        mode: TABLE,
        loading: true,
        dataSource: [],
        selectedRows: [],
        meta: {},
        params: {},
        columns: []
    });

    useEffect(() => {
        renderData();
    }, [manifest]);

    function isCreatableAndUpdatable() {
        return !!(manifest.routes.includes(HAS_FORM_UPDATE) || manifest.routes.includes(HAS_FORM_CREATE));
    }

    function isClickableRow() {
        return !!appContext.appState.user.general_clickable_row;
    }

    function handleDelete(id) {
        useFetch(`api/${manifest.moduleName}/${id}`, DELETE);
    }

    function handleMassDelete(ids) {
        setState((prevState) => ({
            ...prevState,
            loading: true,
        }))
        useFetch(`api/${manifest.moduleName}/mass_destroy`, POST, {ids: ids}).then(() => {
            renderData(state.params);
        });
    }

    function onRow(record, rowIndex) {
        return {
            onClick: event => {
                if (isClickableRow() && isCreatableAndUpdatable()) {
                    navigate(`/${manifest.displayName}/${record.id}`);
                }
            },
            onDoubleClick: event => {
            },
            onContextMenu: event => {
            },
            onMouseEnter: event => {
                if (isClickableRow() && isCreatableAndUpdatable()) {
                    document.body.style.cursor = "pointer";
                }
            },
            onMouseLeave: event => {
                if (isClickableRow() && isCreatableAndUpdatable()) {
                    document.body.style.cursor = "default";
                }
            },
        };
    }

    function renderData(params = {}) {
        if (manifest.moduleName === getPayloadModule()) {
            params = {...getPayload(), ...params};
        }
        setPayload(params);
        setPayloadModule(manifest.moduleName);
        useFetch(`/api/${manifest.moduleName}`, GET, params).then((response) => {
            setState(prevState => ({
                ...prevState,
                loading: false,
                dataSource: response.data,
                meta: response.meta,
                params: params,
                columns: getColumns(manifest.table.columns),
            }));
        });
    }

    function onChange(pagination, filters, sorter) {
        let orderByDirection = sorter.order;
        if (orderByDirection === 'ascend') {
            orderByDirection = 'asc';
        } else if (orderByDirection === 'descend') {
            orderByDirection = 'desc';
        }
        const params = {
            orderByColumn: sorter.column ? sorter.column.key : null,
            orderByDirection: orderByDirection
        };
        for (let key in filters) {
            if (filters.hasOwnProperty(key)) {
                params[key] = filters[key];
            }
        }
        renderData(params);
    }

    function getColumns(columns) {
        let newColumns = columns;
        newColumns = newColumns.map((column) => {
            if (column.hasOwnProperty('filter')) {
                const filterType = generateColumnFilterByType(column);
                if (filterType) {
                    column = {...column, ...filterType};
                }
            }
            if (column.hasOwnProperty('booleanTagRender')) {
                column['render'] = (text, record) => {
                    return (
                        <BooleanTag
                            text={text}
                            record={record}
                            field={column.dataIndex}
                            tags={column.booleanTagRender}
                        />
                    )
                }
            }
            if (column.hasOwnProperty('sequenceNumberRender')) {
                column['render'] = (text, record) => {
                    return (<SequenceNumber
                        text={text}
                        record={record}
                        field={column.dataIndex}
                    />)
                }
            }
            return column;
        });
        if (!isClickableRow() && isCreatableAndUpdatable()) {
            newColumns.push({
                className: 'column-actions',
                dataIndex: 'column_actions',
                key: 'column_actions',
                title: 'Actions',
                render: (text, record) => {
                    return (
                        <Button type="primary" size={'small'}>
                            <Link to={`/${manifest.displayName}/${record.id}`}>
                                <EyeOutlined/>
                            </Link>
                        </Button>
                    )
                }
            });
        }
        if (manifest.table.columnSelection) {
            newColumns.push({
                className: 'column-selection',
                dataIndex: COLUMN_SELECTION,
                key: COLUMN_SELECTION,
                title: (
                    <ColumnSelectionFilter/>
                ),
            });
        }
        newColumns = newColumns.filter(column => {
            if (!column.hasOwnProperty('hidden')) {
                return column;
            }
        });
        return newColumns;
    }

    function generateColumnFilterByType(column) {
        const dataIndex = column.dataIndex;
        const filterType = column.filter;
        if (filterType === SEARCH) {
            return {
                filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => {
                    return (
                        <SearchFilter
                            dataIndex={dataIndex}
                            setSelectedKeys={setSelectedKeys}
                            selectedKeys={selectedKeys}
                            confirm={confirm}
                            clearFilters={clearFilters}
                        />
                    )
                },
                filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
            }
        }
        if (filterType === DATE_RANGE) {
            return {
                filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => {
                    return (
                        <DateRangeFilter
                            dataIndex={dataIndex}
                            setSelectedKeys={setSelectedKeys}
                            selectedKeys={selectedKeys}
                            confirm={confirm}
                            clearFilters={clearFilters}
                        />
                    )
                },
                filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
            }
        }
        if (filterType === SELECT) {
            return {
                filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => {
                    return (
                        <SelectFilter
                            dataIndex={dataIndex}
                            setSelectedKeys={setSelectedKeys}
                            selectedKeys={selectedKeys}
                            confirm={confirm}
                            clearFilters={clearFilters}
                            options={column.options}
                        />
                    )
                },
                filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
            }
        }
        return null;
    }

    return (
        <TableContextProvider value={{
            manifest: manifest,
            state: state,
            setState: setState,
            renderData: renderData,
            handleDelete: handleDelete,
            handleMassDelete: handleMassDelete
        }}>
            <ControlPanel
                topColOneLeft={<CustomBreadcrumb/>}
                topColTwoRight={<GlobalSearchFilter/>}
                bottomColOneLeft={<TableCreateButton/>}
                bottomColOneRight={<ActionsDropdownButton/>}
                bottomColTwoRight={
                    <Row align={'right'}>
                        <Col span={20}><CustomPagination/></Col>
                        <Col span={4}><KanbanTablePicker/></Col>
                    </Row>
                }
            />
            <Table
                className={'evening-table'}
                rowSelection={{
                    onChange: (selectedRowKeys, selectedRows) => {
                        setState(prevState => ({
                            ...prevState,
                            selectedRows: selectedRows
                        }));
                    }
                }}
                loading={state.loading}
                dataSource={state.dataSource}
                columns={state.columns}
                rowKey={'id'}
                onRow={onRow}
                pagination={false}
                onChange={onChange}
                size={'small'}
                expandable={false}
            />
        </TableContextProvider>
    )
};


export default TableGeneratorCustom;
