import useListHook from "../Hooks/useListHook"
import {TableContextProvider} from "../Contexts/TableContext"
import ControlPanel from "./ControlPanel"
import CustomBreadcrumb from "./CustomBreadcrumb"
import GlobalSearchFilter from "./TableFilters/GlobalSearchFilter"
import TableCreateButton from "./TableButtons/TableCreateButton"
import ActionsDropdownButton from "./TableButtons/ActionsDropdownButton"
import CustomPagination from "./CustomPagination"
import CustomTable from "./CustomTable"
import {KANBAN, TABLE} from "../consts"
import {useState} from "react"
import {Col, Row} from "antd"
import KanbanTablePicker from "./KanbanTablePicker"
import Cardination from "./Cardination"

const TableGenerator = (manifest) => {
    const [tableState, tableActions] = useListHook(manifest);
    const [dataState, setDataState] = useState({
        mode: TABLE
    });
    return (
        <TableContextProvider value={{
            manifest: manifest,
            tableState: tableState,
            tableActions: tableActions,
            ...manifest.table,
            dataState: dataState,
            setDataState: setDataState,
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
            {dataState.mode === KANBAN ? <Cardination/> : null}
        </TableContextProvider>
    )
};


export default TableGenerator;
