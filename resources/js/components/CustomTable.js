import {Table} from "antd";
import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";

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
        />
    )
};

export default CustomTable;
