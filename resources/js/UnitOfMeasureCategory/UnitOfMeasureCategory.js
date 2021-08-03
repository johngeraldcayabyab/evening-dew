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
                        let index = newDataSource.findIndex(x => x.id === e.model.id);
                        newDataSource[index] = e.model;
                        arr = newDataSource;
                        console.log(e.method);
                        console.log(arr);
                    }

                    if (e.method === 'deleted') {

                    }

                    // let arr = [e.model, ...newDataSource];

                    // newDataSource.push(e.model);
                    // return [e.model, ...newDataSource];

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

