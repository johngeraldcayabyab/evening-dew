import {useState} from "react";
import useFetchHook from "./useFetchHook";
import {DELETE, GET, POST} from "../consts";
import useFetchCatcherHook from "./useFetchCatcherHook";
import {getPayload, getPayloadModule, setPayload, setPayloadModule} from "../Helpers/localstorage";
import {objectHasValue} from "../Helpers/object";

const useListHook = (manifest) => {
    const useFetch = useFetchHook();
    const fetchCatcher = useFetchCatcherHook();
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
            useFetch(`api/${manifest.moduleName}/${id}`, DELETE).then(() => {

            }).catch((responseErr) => {

            });
        },
        handleMassDelete: (ids) => {
            setTableState(state => ({
                ...state,
                loading: true,
            }));
            useFetch(`api/${manifest.moduleName}/mass_destroy`, POST, {ids: ids}).then(() => {
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
            if (manifest.moduleName === getPayloadModule()) {
                params = {...getPayload(), ...params};
            }
            setPayload(params);
            setPayloadModule(manifest.moduleName);
            useFetch(`/api/${manifest.moduleName}`, GET, params).then((response) => {
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

    return [tableState, tableActions]
};

export default useListHook;
