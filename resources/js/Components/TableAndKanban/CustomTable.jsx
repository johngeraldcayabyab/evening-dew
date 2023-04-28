import {Button, Table} from "antd";
import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {EyeOutlined, SearchOutlined} from "@ant-design/icons";
import {TableContext} from "../../Contexts/TableContext";
import SearchFilter from "./TableFilters/SearchFilter.jsx";
import {getAllUrlParams} from "../../Helpers/url";
import {COLUMN_SELECTION, DATE_RANGE, HAS_FORM_CREATE, HAS_FORM_UPDATE, SEARCH, SELECT} from "../../consts";
import DateRangeFilter from "./TableFilters/DateRangeFilter";
import ColumnSelectionFilter from "./TableFilters/ColumnSelectionFilter";
import SelectFilter from "./TableFilters/SelectFilter"
import {AppContext} from "../../Contexts/AppContext"
import BooleanTag from "../Typography/BooleanTag"
import SequenceNumber from "../Typography/SequenceNumber"

const CustomTable = () => {
    const appContext = useContext(AppContext);
    const listContext = useContext(TableContext);
    const manifest = listContext.manifest;
    const navigate = useNavigate();
    const [state, setState] = useState({
        columns: manifest.table.columns
    });

    useEffect(() => {
        return (() => {
            if (isClickableRow() && isCreatableAndUpdatable()) {
                document.body.style.cursor = "default";
            }
        })
    }, []);

    useEffect(() => {
        if (!appContext.appState.appInitialLoad) {
            const selectedFields = [];
            state.columns.forEach((column) => {
                selectedFields.push(column.dataIndex);
            });
            let urlParams = getAllUrlParams();
            urlParams.selected_fields = selectedFields;
            urlParams = {...urlParams, ...manifest.queryDefaults};
            listContext.renderData(urlParams);
        }
    }, [appContext.appState.appInitialLoad, manifest]);

    function getColumns() {
        let columns = state.columns;
        columns = columns.map((column) => {
            if (column.hasOwnProperty('filter')) {
                const filterType = generateColumnFilterByType(column);
                if (filterType) {
                    column = {...column, ...filterType};
                }
            }
            if (column.hasOwnProperty('booleanTagRender')) {
                column['render'] = (text, record) => {
                    return (<BooleanTag
                        text={text}
                        record={record}
                        field={column.dataIndex}
                        tags={column.booleanTagRender}
                    />)
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
            columns.push({
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
        if (listContext.manifest.table.columnSelection) {
            columns.push({
                className: 'column-selection',
                dataIndex: COLUMN_SELECTION,
                key: COLUMN_SELECTION,
                title: (
                    <ColumnSelectionFilter
                        state={state}
                        setState={setState}
                    />
                ),
            });
        }
        return columns.filter(column => {
            if (!column.hasOwnProperty('hidden')) {
                return column;
            }
        })
    }

    function isCreatableAndUpdatable() {
        if (manifest.routes.includes(HAS_FORM_UPDATE) || manifest.routes.includes(HAS_FORM_CREATE)) {
            return true;
        }
        return false;
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

    function onChange(pagination, filters, sorter) {
        let orderByDirection = sorter.order;
        if (orderByDirection === 'ascend') {
            orderByDirection = 'asc';
        } else if (orderByDirection === 'descend') {
            orderByDirection = 'desc';
        }
        listContext.tableState.params.orderByColumn = sorter.column ? sorter.column.key : null;
        listContext.tableState.params.orderByDirection = orderByDirection;
        for (let key in filters) {
            if (filters.hasOwnProperty(key)) {
                listContext.tableState.params[key] = filters[key];
            }
        }
        listContext.renderData(listContext.tableState.params);
    }

    function isClickableRow() {
        return !!appContext.appState.user.general_clickable_row;
    }

    const tableProps = {
        className: 'custom-table',
        rowSelection: listContext.rowSelection,
        loading: listContext.tableState.loading,
        dataSource: listContext.tableState.dataSource,
        columns: manifest.table.columns,
        rowKey: 'id',
        onRow: onRow,
        pagination: false,
        childrenColumnName: 'test',
        onChange: onChange,
        size: 'small',
        expandable: false,
    };

    console.log(tableProps)

    return (<Table {...tableProps}/>)
};

export default CustomTable;
