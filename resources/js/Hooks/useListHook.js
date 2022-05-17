import {useEffect, useState} from "react";
import useFetchHook from "./useFetchHook";
import {DELETE, GET, POST} from "../consts";
import {getAllUrlParams} from "../Helpers/url";
import useFetchCatcherHook from "./useFetchCatcherHook";

const useListHook = (manifest, columns) => {
    const useFetch = useFetchHook();
    const fetchCatcher = useFetchCatcherHook();
    const moduleName = manifest.moduleName;
    const eventName = manifest.eventName;
    const [tableState, setTableState] = useState({
        initialLoad: true,
        loading: true,
        dataSource: [],
        selectedRows: [],
        meta: {},
        params: {},
        moduleName: manifest.moduleName,
    });
    const [tableActions] = useState({
        handleDelete: (id) => {
            useFetch(`api/${moduleName}/${id}`, DELETE).then(() => {
                // haven't decided yet what to do if an individual data is deleted
                // maybe you can use this endpoint in the table for single data delete
                // maybe delete data in the form page and redirect to the nearest neighbour
                // maybe delete data and redirect to empty list of table is blank
            }).catch((responseErr) => {

            });
        },
        handleMassDelete: (ids) => {
            setTableState(state => ({
                ...state,
                loading: true,
            }));
            useFetch(`api/${moduleName}/mass_destroy`, POST, {ids: ids}).then(() => {
                tableActions.renderData(tableState.params);
            }).catch((responseErr) => {
                fetchCatcher.get(responseErr).then(() => {
                    setTableState(state => ({
                        ...state,
                        loading: false,
                    }));
                });
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
            useFetch(`/api/${moduleName}`, GET, params).then((response) => {
                setTableState(state => ({
                    ...state,
                    initialLoad: false,
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
        const urlParams = getAllUrlParams();
        tableActions.renderData(urlParams);
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

export default useListHook;
