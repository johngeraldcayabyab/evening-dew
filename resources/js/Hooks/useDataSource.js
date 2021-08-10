import {useEffect, useState} from "react";

const useDataSource = (url) => {
    const [dataSource, setDataSource] = useState([]);

    useEffect(async () => {
        let responseData = await fetch(url)
            .then(response => response.json())
            .then(data => (data));
        setDataSource(responseData);
    }, []);

    useEffect(() => {
        Echo.channel('measures_categories')
            .listen('MeasureCategoryEvent', e => {
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
            Echo.leaveChannel('measures_categories');
        };
    }, []);

    return [dataSource, setDataSource]
};

export default useDataSource;
