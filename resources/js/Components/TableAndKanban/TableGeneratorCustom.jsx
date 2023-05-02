import {DELETE, GET, HAS_FORM_CREATE, HAS_FORM_UPDATE, POST, TABLE} from "../../consts";
import React, {useContext, useEffect, useState} from "react";
import {Col, Row, Table} from "antd";
import useFetchHook from "../../Hooks/useFetchHook";
import {getPayload, getPayloadModule, setPayload, setPayloadModule} from "../../Helpers/localstorage";
import {AppContext} from "../../Contexts/AppContext";
import {useNavigate} from "react-router-dom";
import {TableContextProvider} from "../../Contexts/TableContext";
import ControlPanel from "../ControlPanel"
import CustomBreadcrumb from "../CustomBreadcrumb"
import CustomPagination from "./CustomPagination"
import GlobalSearchFilter from "./TableFilters/GlobalSearchFilter"
import TableCreateButton from "./TableButtons/TableCreateButton"
import ActionsDropdownButton from "./TableButtons/ActionsDropdownButton"
import KanbanTablePicker from "./KanbanTablePicker"

const TableGeneratorCustom = (manifest) => {
    const appContext = useContext(AppContext);
    const useFetch = useFetchHook();
    const navigate = useNavigate();
    const [state, setState] = useState({
        mode: TABLE,
        loading: true,
        dataSource: [],
        selectedRows: [],
        meta: {},
        params: {},
    });

    useEffect(() => {
        renderData();
    }, [manifest]);

    function isCreatableAndUpdatable() {
        return !!(manifest.routes.includes(HAS_FORM_UPDATE) || manifest.routes.includes(HAS_FORM_CREATE));
    }

    function isClickableRow() {
        return !!appContext.appState.user.general_clickable_row;
    }

    function handleDelete(id) {
        useFetch(`api/${manifest.moduleName}/${id}`, DELETE);
    }

    function handleMassDelete(ids) {
        setState((prevState) => ({
            ...prevState,
            loading: true,
        }))
        useFetch(`api/${manifest.moduleName}/mass_destroy`, POST, {ids: ids}).then(() => {
            renderData(state.params);
        });
    }

    function onRow(record, rowIndex) {
        return {
            onClick: event => {
                if (isClickableRow() && isCreatableAndUpdatable()) {
                    navigate(`/${manifest.displayName}/${record.id}`);
                }
            },
            onDoubleClick: event => {
            },
            onContextMenu: event => {
            },
            onMouseEnter: event => {
                if (isClickableRow() && isCreatableAndUpdatable()) {
                    document.body.style.cursor = "pointer";
                }
            },
            onMouseLeave: event => {
                if (isClickableRow() && isCreatableAndUpdatable()) {
                    document.body.style.cursor = "default";
                }
            },
        };
    }

    function renderData(params = {}) {
        if (manifest.moduleName === getPayloadModule()) {
            params = {...getPayload(), ...params};
        }
        setPayload(params);
        setPayloadModule(manifest.moduleName);
        useFetch(`/api/${manifest.moduleName}`, GET, params).then((response) => {
            setState(prevState => ({
                ...prevState,
                loading: false,
                dataSource: response.data,
                meta: response.meta,
                params: params,
            }));
        });
    }

    function onChange(pagination, filters, sorter) {
        let orderByDirection = sorter.order;
        if (orderByDirection === 'ascend') {
            orderByDirection = 'asc';
        } else if (orderByDirection === 'descend') {
            orderByDirection = 'desc';
        }
        const params = {
            orderByColumn: sorter.column ? sorter.column.key : null,
            orderByDirection: orderByDirection
        };
        for (let key in filters) {
            if (filters.hasOwnProperty(key)) {
                params[key] = filters[key];
            }
        }
        renderData(params);
    }

    return (
        <TableContextProvider value={{
            manifest: manifest,
            state: state,
            setState: setState,
            render: render,
            handleDelete: handleDelete,
            handleMassDelete: handleMassDelete
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
            <Table
                className={'evening-table'}
                rowSelection={{
                    onChange: (selectedRowKeys, selectedRows) => {
                        setState(prevState => ({
                            ...prevState,
                            selectedRows: selectedRows
                        }));
                    }
                }}
                loading={state.loading}
                dataSource={state.dataSource}
                columns={manifest.table.columns}
                rowKey={'id'}
                onRow={onRow}
                pagination={false}
                onChange={onChange}
                size={'small'}
                expandable={false}
            />
        </TableContextProvider>
    )
};


export default TableGeneratorCustom;
