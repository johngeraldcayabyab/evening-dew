import {useEffect, useState} from "react";

const useTableState = (manifest) => {
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
            await fetch(`api/${moduleName}/${id}`, {
                method: 'DELETE'
            }).then(() => {
                setTableState(state => ({
                    ...state,
                    loading: false,
                }));
            });
        }
    })

    useEffect(async () => {
        let responseData = await fetch(`api/${moduleName}`)
            .then(response => response.json())
            .then(data => (data));
        setTableState(state => ({
            ...state,
            loading: false,
            dataSource: responseData
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

export default useTableState;
