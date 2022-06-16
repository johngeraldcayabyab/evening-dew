import {Table} from "antd";
import React, {useContext, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {SearchOutlined} from "@ant-design/icons";
import {TableContext} from "../Contexts/TableContext";
import SearchFilter from "./TableFilters/SearchFilter";
import {getAllUrlParams} from "../Helpers/url";
import {DATE_RANGE, SEARCH} from "../consts";
import DateRangeFilter from "./TableFilters/DateRangeFilter";

const CustomTable = () => {
    const listContext = useContext(TableContext);
    const history = useHistory();

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
        const columns = listContext.columns;
        return columns.map((column) => {
            if (column.hasOwnProperty('filter')) {
                const filterType = generateColumnFilterByType(column.dataIndex, column.filter);
                if (filterType) {
                    column = {...column, ...filterType};
                }
            }
            return column;
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
        />
    )
};

export default CustomTable;
