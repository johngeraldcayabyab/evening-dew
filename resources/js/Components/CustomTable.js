import {Button, Table} from "antd";
import React, {useContext, useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {EyeOutlined, SearchOutlined} from "@ant-design/icons";
import {TableContext} from "../Contexts/TableContext";
import SearchFilter from "./TableFilters/SearchFilter";
import {getAllUrlParams} from "../Helpers/url";
import {COLUMN_SELECTION, DATE_RANGE, SEARCH} from "../consts";
import DateRangeFilter from "./TableFilters/DateRangeFilter";
import ColumnSelectionFilter from "./TableFilters/ColumnSelectionFilter";
import {AppContext} from "../App";

const CustomTable = (props) => {
    const appContext = useContext(AppContext);
    const listContext = useContext(TableContext);
    const history = useHistory();
    const [state, setState] = useState({
        columns: listContext.columns
    });

    useEffect(() => {
        return (() => {
            if (isClickableRow()) {
                document.body.style.cursor = "default";
            }
        })
    }, []);

    useEffect(() => {
        if (!appContext.appState.appInitialLoad) {
            const selectedFields = [];
            listContext.columns.forEach((column) => {
                selectedFields.push(column.dataIndex);
            });
            let urlParams = getAllUrlParams();
            urlParams.selected_fields = selectedFields;
            urlParams = {...urlParams, ...listContext.manifest.queryDefaults};
            listContext.tableActions.renderData(urlParams);
        }
    }, [appContext.appState.appInitialLoad]);

    function getColumns() {
        let columns = state.columns;

        columns = columns.map((column) => {
            if (column.hasOwnProperty('filter')) {
                const filterType = generateColumnFilterByType(column.dataIndex, column.filter);
                if (filterType) {
                    column = {...column, ...filterType};
                }
            }
            return column;
        });

        if (!isClickableRow()) {
            columns.push({
                className: 'column-actions',
                dataIndex: 'column_actions',
                key: 'column_actions',
                title: 'Actions',
                render: (text, record) => {
                    return (
                        <Button type="primary" size={'small'}>
                            <Link to={`/${listContext.manifest.displayName}/${record.id}`}>
                                <EyeOutlined/>
                            </Link>
                        </Button>
                    )
                }
            });
        }

        if (listContext.columnSelection) {
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

    function generateColumnFilterByType(dataIndex, filterType) {
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
        return null;
    }

    function onRow(record, rowIndex) {
        return {
            onClick: event => {
                if (isClickableRow()) {
                    history.push(`/${listContext.manifest.displayName}/${record.id}`);
                }
            },
            onDoubleClick: event => {
            },
            onContextMenu: event => {
            },
            onMouseEnter: event => {
                if (isClickableRow()) {
                    document.body.style.cursor = "pointer";
                }
            },
            onMouseLeave: event => {
                if (isClickableRow()) {
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
        listContext.tableActions.renderData(listContext.tableState.params);
    }

    function isClickableRow() {
        if (appContext.appState.globalSetting.general_clickable_row) {
            return true;
        }
        return false;
    }

    return (
        <Table
            className={'custom-table'}
            rowSelection={listContext.tableActions.rowSelection}
            loading={listContext.tableState.loading}
            dataSource={listContext.tableState.dataSource}
            columns={getColumns()}
            rowKey={'id'}
            onRow={onRow}
            pagination={false}
            childrenColumnName={'test'}
            onChange={onChange}
            size={'small'}
            expandable={props.expandable}
        />
    )
};

export default CustomTable;
