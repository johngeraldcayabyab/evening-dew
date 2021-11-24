import {useEffect, useState} from "react";
import {fetchDelete, fetchGet} from "../Helpers/fetcher";

const useListState = (manifest, columns) => {
    const moduleName = manifest.moduleName;
    const eventName = manifest.eventName;
    const [tableState, setTableState] = useState({
        loading: true,
        dataSource: [],
    });
    const [tableActions] = useState({
        handleDelete: async (id) => {
            setTableState(state => ({
                ...state,
                loading: true,
            }));
            await fetchDelete(`api/${moduleName}/${id}`).then(() => {
                setTableState(state => ({
                    ...state,
                    loading: false,
                }));
            });
        },
    });

    useEffect(async () => {
        let responseData = await fetchGet(`api/${moduleName}`)
            .then(response => response.json())
            .then(data => (data));
        setTableState(state => ({
            ...state,
            loading: false,
            dataSource: responseData,
            columns: columns
        }));
    }, []);


    useEffect(() => {
        Echo.channel(moduleName)
            .listen(eventName, e => {
                setTableState(state => {
                    let newState = {
                        ...state,
                        loading: false,
                    };
                    if (e.method === 'created') {
                        newState.dataSource = [e.model, ...state.dataSource];
                    }
                    if (e.method === 'updated') {
                        newState.dataSource = [...state.dataSource.map((data) => {
                            if (data.id === e.model.id) {
                                data = e.model;
                            }
                            return data;
                        })]
                    }
                    if (e.method === 'deleted') {
                        newState.dataSource = [...state.dataSource.filter(index => index.id !== e.model.id)];
                    }
                    return newState;
                });
            });
        return () => {
            Echo.leaveChannel(moduleName);
        };
    }, []);

    return [tableState, tableActions]
};

export default useListState;
