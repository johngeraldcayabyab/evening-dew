import {useEffect, useState} from "react";

const useDataSource = (moduleName) => {
    const [dataSource, setDataSource] = useState([]);

    useEffect(async () => {
        let responseData = await fetch(`api/${moduleName}`)
            .then(response => response.json())
            .then(data => (data));
        setDataSource(responseData);
    }, []);

    let handleDelete = async (id) => {
        await fetch(`api/${moduleName}/${id}`, {
            method: 'DELETE'
        });
    };

    useEffect(() => {
        Echo.channel(moduleName)
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
            Echo.leaveChannel(moduleName);
        };
    }, []);

    return [dataSource, handleDelete, setDataSource]
};

export default useDataSource;
