import React from 'react';
import {Button, Popconfirm, Space, Table} from "antd";
import useListState from "../Hooks/useListState";
import {Link} from "react-router-dom";
import manifest from "./__manifest__.json";
import {DeleteOutlined, EyeOutlined} from "@ant-design/icons";
import TableCreateButton from "../components/ActionButtons/TableCreateButton";
import ControlPanel from "../components/ControlPanel";

const MeasurementCategoryList = () => {
    const [tableState, tableActions] = useListState(manifest, [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (data) => {
                return (
                    <Space>
                        <Button size={"small"} type="primary">
                            <Link to={`/${manifest.moduleName}/${data.id}`}><EyeOutlined/></Link>
                        </Button>
                        <Popconfirm title={`Are you sure delete this ${manifest.moduleName}?`} okText="Yes"
                                    cancelText="No" onConfirm={() => {
                            tableActions.handleDelete(data.id);
                        }}>
                            <Button size={"small"} type="primary" danger>
                                <DeleteOutlined/>
                            </Button>
                        </Popconfirm>
                    </Space>
                );
            }
        },
    ]);

    return (
        <React.Fragment>
            <ControlPanel
                bottomColOneLeft={<TableCreateButton manifest={manifest}/>}
            />
            <Table
                loading={tableState.loading}
                size={'small'}
                dataSource={tableState.dataSource}
                columns={tableState.columns}
                rowKey={'id'}
                onRow={tableState.onRow}
            />
        </React.Fragment>
    )
};

export default MeasurementCategoryList;

