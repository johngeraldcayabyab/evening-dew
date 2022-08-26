import {Table} from "antd";
import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {MoreOutlined, SearchOutlined} from "@ant-design/icons";
import {TableContext} from "../Contexts/TableContext";
import SearchFilter from "./TableFilters/SearchFilter";
import {getAllUrlParams} from "../Helpers/url";
import {COLUMN_SELECTION, DATE_RANGE, SEARCH} from "../consts";
import DateRangeFilter from "./TableFilters/DateRangeFilter";
import ColumnSelectionFilter from "./TableFilters/ColumnSelectionFilter";

const CustomTable = (props) => {
    const listContext = useContext(TableContext);
    const history = useHistory();
    const [state, setState] = useState({
        columns: listContext.columns
    });

    useEffect(() => {
        return (() => {
            document.body.style.cursor = "default";
        })
    }, []);

    useEffect(() => {
        const selectedFields = [];
        listContext.columns.forEach((column) => {
            selectedFields.push(column.dataIndex);
        });
        let urlParams = getAllUrlParams();
        urlParams.selected_fields = selectedFields;
        urlParams = {...urlParams, ...listContext.manifest.queryDefaults};
        listContext.tableActions.renderData(urlParams);
    }, []);

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
        if (filterType === COLUMN_SELECTION) {
            return {
                filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => {
                    return (
                        <ColumnSelectionFilter
                            dataIndex={dataIndex}
                            setSelectedKeys={setSelectedKeys}
                            selectedKeys={selectedKeys}
                            confirm={confirm}
                            clearFilters={clearFilters}
                            state={state}
                            setState={setState}
                        />
                    )
                },
                filterIcon: <MoreOutlined style={{color: 'grey', fontSize: '15px'}}/>,
            }
        }
        return null;
    }

    function onRow(record, rowIndex) {
        return {
            onClick: event => {
                history.push(`/${listContext.manifest.displayName}/${record.id}`);
            },
            onDoubleClick: event => {
            },
            onContextMenu: event => {
            },
            onMouseEnter: event => {
                document.body.style.cursor = "pointer";
            },
            onMouseLeave: event => {
                document.body.style.cursor = "default";
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
