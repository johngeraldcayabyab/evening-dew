import {Table} from "antd";
import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {SearchOutlined} from "@ant-design/icons";
import {TableContext} from "../Contexts/TableContext";
import FilterDropdown from "./TableFilters/FilterDropdown";
import {getAllUrlParams} from "../Helpers/url";

const CustomTable = () => {
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
        const columns = state.columns.map((column) => {
            if (column.hasOwnProperty('searchFilter')) {
                column = {...column, ...getColumnSearchProps(column.dataIndex)};
            }
            if (!column.hasOwnProperty('hidden')) {
                selectedFields.push(column.dataIndex);
            }
            return column;
        });
        setState((prevState) => ({
            ...prevState,
            columns: columns,
        }));
        let urlParams = getAllUrlParams();
        urlParams.selected_fields = selectedFields;
        urlParams = {...urlParams, ...listContext.manifest.queryDefaults};
        listContext.tableActions.renderData(urlParams);
    }, []);

    function getColumnSearchProps(dataIndex) {
        return {
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
                <FilterDropdown
                    dataIndex={dataIndex}
                    setSelectedKeys={setSelectedKeys}
                    selectedKeys={selectedKeys}
                    confirm={confirm}
                    clearFilters={clearFilters}
                />
            ),
            filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
        }
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
            columns={state.columns}
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
