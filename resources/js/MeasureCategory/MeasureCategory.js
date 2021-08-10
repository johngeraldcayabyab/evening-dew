import React, {useEffect, useRef} from 'react';
import {Button, Table} from "antd";
import useDataSource from "../Hooks/useDataSource";
import {Link} from "react-router-dom";

export const MeasureCategory = () => {
        const [dataSource] = useDataSource('api/measures_categories');

        let handleDelete = async (id) => {
            await fetch(`api/measures_categories/${id}`, {
                method: 'DELETE'
            });
        };

        const columns = [
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
                        <React.Fragment>
                            <Button size={"small"} type="primary">
                                <Link to={`/measures_categories/${data.id}`}>Edit</Link>
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
    }
;

