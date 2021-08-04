import React, {useEffect, useRef} from 'react';
import {Table} from "antd";
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

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
    ];

    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            rowKey={'id'}
        />
    )
};

