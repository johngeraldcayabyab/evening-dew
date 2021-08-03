import React, {useEffect, useRef} from 'react';
import {Table} from "antd";
import useFetch from "../Hooks/useFetch";

export const UnitOfMeasureCategory = () => {
    const [dataSource, setDataSource] = useFetch('api/units_of_measure_categories');

    useEffect(() => {
        Echo.channel('units_of_measure_categories')
            .listen('UnitOfMeasureCategoryEvent', e => {
                setDataSource(newDataSource => {
                    newDataSource.push(e.model);
                    return [e.model, ...newDataSource];
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

