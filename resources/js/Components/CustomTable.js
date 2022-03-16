import {Button, Input, Space, Table} from "antd";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {SearchOutlined} from "@ant-design/icons";

const CustomTable = (props) => {
    const history = useHistory();
    const [state, setState] = useState({
        columns: props.columns
    })

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
                <div style={{padding: 8}}>
                    <Input
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys}
                        onChange={e => setSelectedKeys(e.target.value ? e.target.value : null)}
                        onPressEnter={() => {
                            confirm();
                        }}
                        style={{marginBottom: 8, display: 'block'}}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => {
                                confirm();
                            }}
                            icon={<SearchOutlined/>}
                            size="small"
                            style={{width: 90}}
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => {
                                clearFilters();
                                // confirm();
                            }}
                            size={"small"}
                            style={{width: 90}}
                        >
                            Reset
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
        }
    }

    return (
        <Table
            rowSelection={props.rowSelection}
            loading={props.loading}
            dataSource={props.dataSource}
            columns={state.columns}
            rowKey={'id'}
            onRow={(record, rowIndex) => {
                return {
                    onClick: event => {
                        history.push(`/${props.manifest.moduleName}/${record.id}`);
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
                props.params.orderByColumn = sorter.column ? sorter.column.key : null;
                props.params.orderByDirection = orderByDirection;
                for (let key in filters) {
                    if (filters.hasOwnProperty(key)) {
                        props.params[key] = filters[key];
                    }
                }
                props.renderData(props.params);
            }}
            size={'small'}
        />
    )
};

export default CustomTable;
