import {Pagination} from "antd";
import {TableContext} from "../Contexts/TableContext";
import {useContext} from "react";

const CustomPagination = () => {
    const listContext = useContext(TableContext);
    return (
        <Pagination
            size={'small'}
            current={listContext.tableState.meta ? listContext.tableState.meta.current_page : 1}
            total={listContext.tableState.meta ? listContext.tableState.meta.total : 1}
            pageSize={30} // not respecting meta condition if null
            showSizeChanger={false}
            showQuickJumper
            simple={true}
            onChange={(page, pageSize) => {
                listContext.tableState.params.page = page;
                listContext.tableActions.renderData(listContext.tableState.params);
            }}
        />
    )
}

export default CustomPagination;
