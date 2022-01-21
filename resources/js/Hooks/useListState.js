import {useEffect, useState} from "react";
import {fetchDelete, fetchPost} from "../Helpers/fetcher";
import useFetchCatcher from "./useFetchCatcher";
import useFetchHook from "./useFetchHook";
import {GET} from "../consts";

const useListState = (manifest, columns) => {
    const [useFetch, fetchAbort] = useFetchHook();
    const fetchCatcher = useFetchCatcher();
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
        renderData: (params = {}) => {
            useFetch(`api/${moduleName}`, GET, params).then((response) => {
                setTableState(state => ({
                    ...state,
                    loading: false,
                    dataSource: response.data,
                    meta: response.meta,
                    params: params,
                }));
            }).catch((responseErr) => {
                fetchCatcher.get(responseErr);
            });
        }
    });


    useEffect(() => {
        tableActions.renderData(tableState.params);
    }, []);

    useEffect(() => {
        return () => {
            fetchAbort();
        };
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
