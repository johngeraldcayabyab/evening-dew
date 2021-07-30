import React, {useEffect, useState} from 'react';
import {Table} from "antd";

export const UnitOfMeasureCategory = () => {

    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {

        fetch('api/units_of_measure_categories')
            .then(response => response.json())
            .then(data => () => {
                setDataSource(data);
            });


    }, [dataSource]);


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
    ];

    return (
        <Table dataSource={dataSource} columns={columns}/>
    )
};

