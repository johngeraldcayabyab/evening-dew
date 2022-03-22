import {Pagination} from "antd";
import {ListContext} from "../Contexts/ListContext";
import {useContext} from "react";

const CustomPagination = () => {
    const listContext = useContext(ListContext);

    return (
        <Pagination
            size={'small'}
            current={listContext.tableState.meta ? listContext.tableState.meta.current_page : 1}
            total={listContext.tableState.meta ? listContext.tableState.meta.total : 1}
            pageSize={80} // not respecting meta condition if null
            showSizeChanger={false}
            showQuickJumper
            onChange={(page, pageSize) => {
                listContext.tableState.params.page = page;
                listContext.tableActions.renderData(listContext.tableState.params);
            }}
        />
    )
}

export default CustomPagination;
