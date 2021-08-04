import React, {useEffect, useRef} from 'react';
import {Button, Table} from "antd";
import useFetch from "../Hooks/useFetch";

export const UnitOfMeasureCategory = () => {
        const [dataSource, setDataSource] = useFetch('api/units_of_measure_categories');

        useEffect(() => {
            Echo.channel('units_of_measure_categories')
                .listen('UnitOfMeasureCategoryEvent', e => {
                    setDataSource(newDataSource => {
                        let arr = [];

                        if (e.method === 'created') {
                            arr = [e.model, ...newDataSource];
                        }

                        if (e.method === 'updated') {
                            arr = [...newDataSource.map((data) => {
                                if (data.id === e.model.id) {
                                    data = e.model;
                                }
                                return data;
                            })]
                        }

                        if (e.method === 'deleted') {
                            arr = [...newDataSource.filter(index => index.id !== e.model.id)];
                        }

                        return arr;
                    });
                });
            return () => {
                Echo.leaveChannel('units_of_measure_categories');
            };
        }, []);

        let handleDelete = async (id) => {
            await fetch(`api/units_of_measure_categories/${id}`, {
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
                        <Button size={"small"} type="primary" danger onClick={() => {
                            handleDelete(data.id);
                        }}>
                            Delete
                        </Button>
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

