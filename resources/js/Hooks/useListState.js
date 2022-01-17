import {useEffect, useState} from "react";
import {fetchDelete, fetchGet, fetchPost} from "../Helpers/fetcher";

const useListState = (manifest, columns) => {
    const moduleName = manifest.moduleName;
    const eventName = manifest.eventName;
    const [tableState, setTableState] = useState({
        loading: true,
        dataSource: [],
        selectedRows: [],
        meta: {},
        params: {},
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
                tableActions.renderData(tableState.params);
            });
        },
        rowSelection: {
            onChange: (selectedRowKeys, selectedRows) => {
                setTableState(state => ({
                    ...state,
                    selectedRows: selectedRows
                }));
            }
        },
        renderData: async (params = {}) => {
            let responseJson = await fetchGet(`api/${moduleName}`, params)
                .then(responseJson => {
                    return responseJson;
                });

            setTableState(state => ({
                ...state,
                loading: false,
                dataSource: responseJson.data,
                meta: responseJson.meta,
                params: params,
            }));
        }
    });


    useEffect(() => {
        tableActions.renderData(tableState.params);
    }, []);


    useEffect(() => {
        // Echo.channel(`measurement`).listen('Illuminate\\Database\\Eloquent\\BroadcastableModelEventOccurred', (event) => {
        //
        // });

        // Echo.channel(`${moduleName}_channel`).listen(`.${moduleName}_event`, e => {
        //
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

    return [tableState, tableActions, columns]
};

export default useListState;
