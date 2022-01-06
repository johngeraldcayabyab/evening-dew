import {Table} from "antd";
import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {cleanObject} from "../Helpers/object";

const CustomTable = (props) => {
    const history = useHistory();

    useEffect(() => {
        return (() => {
            document.body.style.cursor = "default";
        })
    }, []);


    return (
        <Table
            rowSelection={props.rowSelection}
            loading={props.loading}
            size={'small'}
            dataSource={props.dataSource}
            columns={props.columns}
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
            onChange={(pagination, filters, sorter) => {
                let orderByDirection = sorter.order;
                if (orderByDirection === 'ascend') {
                    orderByDirection = 'asc';
                } else if (orderByDirection === 'descend') {
                    orderByDirection = 'desc';
                }
                props.params.orderByColumn = sorter.column ? sorter.column.dataIndex : null;
                props.params.orderByDirection = orderByDirection;
                filters = cleanObject(filters);
                for (let key in filters) {
                    if (filters.hasOwnProperty(key)) {
                        props.params[key] = filters[key];
                    }
                }
                props.renderData(props.params);
                console.log(filters);
            }}
        />
    )
};

export default CustomTable;
