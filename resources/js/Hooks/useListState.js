import {useEffect, useState} from "react";

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
            await fetch(`api/${moduleName}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(() => {
                setTableState(state => ({
                    ...state,
                    loading: false,
                }));
            });
        },
        onRow: (record, rowIndex) => {
            console.log(rowIndex);
            return {
                onClick: event => {
                    console.log(record.id);
                }, // click row
                // onDoubleClick: event => {}, // double click row
                // onContextMenu: event => {}, // right button click row
                onMouseHover: event => {
                    // console.log(
                    //     1
                    // );
                    window.status = `http://bla.com/bla.htm${record.id}`;
                }, // mouse enter row
                // onMouseLeave: event => {}, // mouse leave row
            };
        }
    });

    useEffect(async () => {
        let responseData = await fetch(`api/${moduleName}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
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
