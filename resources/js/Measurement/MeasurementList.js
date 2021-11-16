import React from 'react';
import {Button, Layout, Popconfirm, Space, Table} from "antd";
import useListState from "../Hooks/useListState";
import {Link} from "react-router-dom";
import manifest from "./__manifest__.json";
import {DeleteOutlined, EyeOutlined} from "@ant-design/icons";
import TableCreateButton from "../components/ActionButtons/TableCreateButton";

const MeasurementList = () => {
    const [tableState, tableActions] = useListState(manifest);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Ratio',
            dataIndex: 'ratio',
            key: 'ratio',
        },
        {
            title: 'Rounding Precision',
            dataIndex: 'rounding_precision',
            key: 'rounding_precision',
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
    ];

    return (
        <React.Fragment>
            <Layout.Content style={{padding: '5px 5px 5px 0'}}>
                <Space>
                    <TableCreateButton manifest={manifest}/>
                </Space>
            </Layout.Content>
            <Table
                loading={tableState.loading}
                size={'small'}
                dataSource={tableState.dataSource}
                columns={columns}
                rowKey={'id'}
            />
        </React.Fragment>
    )
};

export default MeasurementList;

