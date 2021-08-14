import React from 'react';
import {Button, Table} from "antd";
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
                    <React.Fragment>
                        <Button size={"small"} type="primary">
                            <Link to={`/${manifest.moduleName}/${data.id}`}><EyeOutlined/></Link>
                        </Button>
                        <Button size={"small"} type="primary" danger onClick={() => {
                            tableActions.handleDelete(data.id);
                        }}>
                            <DeleteOutlined/>
                        </Button>
                    </React.Fragment>

                );
            }
        },
    ];

    return (
        <Table
            loading={tableState.loading}
            size={'small'}
            dataSource={tableState.dataSource}
            columns={columns}
            rowKey={'id'}
        />
    )
};

export default Menu;

