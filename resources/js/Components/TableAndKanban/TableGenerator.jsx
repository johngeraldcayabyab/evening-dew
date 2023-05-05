import {TableContextProvider} from "../../Contexts/TableContext"
import ControlPanel from "../ControlPanel"
import CustomBreadcrumb from "../CustomBreadcrumb"
import GlobalSearchFilter from "./TableFilters/GlobalSearchFilter"
import TableCreateButton from "./TableButtons/TableCreateButton"
import ActionsDropdownButton from "./TableButtons/ActionsDropdownButton"
import CustomPagination from "./CustomPagination"
import CustomTable from "./CustomTable"
import {DELETE, GET, KANBAN, POST, TABLE} from "../../consts"
import {useState} from "react"
import {Col, Row} from "antd"
import KanbanTablePicker from "./KanbanTablePicker"
import Kanban from "./Kanban"
import useFetchHook from "../../Hooks/useFetchHook"
import {getPayload, getPayloadModule, setPayload, setPayloadModule} from "../../Helpers/localstorage"

const TableGenerator = (manifest) => {
    const useFetch = useFetchHook();
    const [tableState, setTableState] = useState({
        initialLoad: true,
        loading: true,
        dataSource: [],
        selectedRows: [],
        meta: {},
        params: {},
    });

    function handleDelete(id) {
        useFetch(`api/${manifest.moduleName}/${id}`, DELETE);
    }

    function handleMassDelete(ids) {
        setTableState(state => ({
            ...state,
            loading: true,
        }));
        useFetch(`api/${manifest.moduleName}/mass_destroy`, POST, {ids: ids}).then(() => {
            renderData(tableState.params);
        });
    }

    function renderData(params = {}) {
        if (manifest.moduleName === getPayloadModule()) {
            params = {...getPayload(), ...params};
        }
        setPayload(params);
        setPayloadModule(manifest.moduleName);
        useFetch(`/api/${manifest.moduleName}`, GET, params).then((response) => {
            setTableState(prevState => ({
                ...prevState,
                initialLoad: false,
                loading: false,
                dataSource: response.data,
                meta: response.meta,
                params: params,
            }));
        });
    }


    const [dataState, setDataState] = useState({
        mode: TABLE
    });
    return (
        <TableContextProvider value={{
            manifest: manifest,
            tableState: tableState,
            dataState: dataState,
            setDataState: setDataState,
            handleDelete: handleDelete,
            handleMassDelete: handleMassDelete,
            renderData: renderData,
            rowSelection: {
                onChange: (selectedRowKeys, selectedRows) => {
                    setTableState(state => ({
                        ...state,
                        selectedRows: selectedRows
                    }));
                }
            },
        }}>
            <ControlPanel
                topColOneLeft={<CustomBreadcrumb/>}
                topColTwoRight={<GlobalSearchFilter/>}
                bottomColOneLeft={<TableCreateButton/>}
                bottomColOneRight={<ActionsDropdownButton/>}
                bottomColTwoRight={
                    <Row align={'right'}>
                        <Col span={20}><CustomPagination/></Col>
                        <Col span={4}><KanbanTablePicker/></Col>
                    </Row>
                }
            />
            {dataState.mode === TABLE ? <CustomTable/> : null}
            {dataState.mode === KANBAN ? <Kanban/> : null}
        </TableContextProvider>
    )
};


export default TableGenerator;
