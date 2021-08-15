import React from 'react';
import {Button, Card, Layout, Popconfirm, Space, Table} from "antd";
import useTableState from "../Hooks/useTableState";
import {Link} from "react-router-dom";
import manifest from "./__manifest__.json";
import {EyeOutlined, DeleteOutlined} from '@ant-design/icons';

const Menu = () => {
    const [tableState, tableActions] = useTableState(manifest);

    const columns = [
        {
            title: 'Label',
            dataIndex: 'label',
            key: 'label',
        },
        {
            title: 'Url',
            dataIndex: 'url',
            key: 'url',
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
            <Layout.Content style={{padding:'5px 5px 5px 0'}}>
                <Space>
                    <Button type="primary" size={'small'}>Create</Button>
                    <Button type="primary" size={'small'}>Create</Button>
                    <Button type="primary" size={'small'}>Create</Button>
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

export default Menu;

