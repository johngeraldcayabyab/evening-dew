import {Table} from "antd";
import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {SearchOutlined} from "@ant-design/icons";
import {ListContext} from "../Contexts/ListContext";
import FilterDropdown from "./TableButtons/FilterDropdown";

const CustomTable = () => {
    const listContext = useContext(ListContext);
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
        const columns = state.columns.map((column) => {
            if (column.hasOwnProperty('searchFilter')) {
                column = {...column, ...getColumnSearchProps(column.dataIndex)};
            }
            return column;
        });
        setState((prevState) => ({
            ...prevState,
            columns: columns,
        }));
    }, []);

    function getColumnSearchProps(dataIndex) {
        return {
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
                <FilterDropdown
                    props={dataIndex}
                    setSelectedKeys={setSelectedKeys}
                    selectedKeys={selectedKeys}
                    confirm={confirm}
                    clearFilters={clearFilters}
                />
            ),
            filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
        }
    }

    return (
        <Table
            rowSelection={listContext.tableActions.rowSelection}
            loading={listContext.tableState.loading}
            dataSource={listContext.tableState.dataSource}
            columns={state.columns}
            rowKey={'id'}
            onRow={(record, rowIndex) => {
                return {
                    onClick: event => {
                        history.push(`/${listContext.manifest.moduleName}/${record.id}`);
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
            }}
            pagination={false}
            childrenColumnName={'test'}
            onChange={(pagination, filters, sorter) => {
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
            }}
            size={'small'}
        />
    )
};

export default CustomTable;
