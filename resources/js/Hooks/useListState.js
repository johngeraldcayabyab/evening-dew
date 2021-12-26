import {useEffect, useState} from "react";
import {fetchDelete, fetchGet, fetchPost} from "../Helpers/fetcher";

const useListState = (manifest, columns) => {
    const moduleName = manifest.moduleName;
    const eventName = manifest.eventName;
    const [tableState, setTableState] = useState({
        loading: true,
        dataSource: [],
        selectedRows: []
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

        handleMassDelete: async (ids) => {

            setTableState(state => ({
                ...state,
                loading: true,
            }));

            await fetchPost(`api/${moduleName}/mass_destroy`, {ids: ids}).then(() => {
                setTableState(state => ({
                    ...state,
                    loading: false,
                }));
            });

        },
        rowSelection: {
            onChange: (selectedRowKeys, selectedRows) => {
                setTableState(state => ({
                    ...state,
                    selectedRows: selectedRows
                }));
            }
        }
    });

    useEffect(async () => {
        let responseData = await fetchGet(`api/${moduleName}`)
            .then(response => response.json())
            .then(responseJson => {
                return responseJson.data;
            });
        console.log(responseData, 'the data');
        setTableState(state => ({
            ...state,
            loading: false,
            dataSource: responseData,
            columns: columns
        }));
    }, []);


    useEffect(() => {
        console.log(123);
        Echo.channel(`measurement`).listen('Illuminate\\Database\\Eloquent\\BroadcastableModelEventOccurred', (event) => {
            console.log(event);
        });

        // Echo.channel(`${moduleName}_channel`).listen(`.${moduleName}_event`, e => {
        //     console.log(e);
        //     setTableState(state => {
        //         let newState = {
        //             ...state,
        //             loading: false,
        //         };
        //         if (e.method === 'created') {
        //             newState.dataSource = [e.model, ...state.dataSource];
        //         }
        //         if (e.method === 'updated') {
        //             newState.dataSource = [...state.dataSource.map((data) => {
        //                 if (data.id === e.model.id) {
        //                     data = e.model;
        //                 }
        //                 return data;
        //             })]
        //         }
        //         if (e.method === 'deleted') {
        //             newState.dataSource = [...state.dataSource.filter(index => index.id !== e.model.id)];
        //         }
        //         return newState;
        //     });
        // });
        // return () => {
        //     Echo.leaveChannel(moduleName);
        // };
    }, []);

    return [tableState, tableActions]
};

export default useListState;
