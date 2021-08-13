import React from 'react';
import {Button, Table} from "antd";
import useDataSource from "../Hooks/useDataSource";
import {Link} from "react-router-dom";
import manifest from "./__manifest__.json";

const Menu = () => {
    const [dataSource, handleDelete] = useDataSource(manifest);

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
                            <Link to={`/${manifest.moduleName}/${data.id}`}>Edit</Link>
                        </Button>
                        <Button size={"small"} type="primary" danger onClick={() => {
                            handleDelete(data.id);
                        }}>
                            Delete
                        </Button>
                    </React.Fragment>

                );
            }
        },
    ];

    return (
        <Table
            size={'small'}
            dataSource={dataSource}
            columns={columns}
            rowKey={'id'}
        />
    )
};

export default Menu;

