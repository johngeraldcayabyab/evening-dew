import {Pagination, Skeleton} from "antd";
import {TableContext} from "../../Contexts/TableContext";
import {useContext} from "react";

const CustomPagination = () => {
    const listContext = useContext(TableContext);

    if (listContext.tableState.loading) {
        return (
            <Skeleton.Input
                className={'ant-skeleton-element-custom'}
                style={{display: 'block', width: '100%'}}
                active={true}
            />
        );
    }

    return (
        <Pagination
            size={'small'}
            current={listContext.tableState.meta ? listContext.tableState.meta.current_page : 1}
            total={listContext.tableState.meta ? listContext.tableState.meta.total : 1}
            simple={true}
            pageSize={listContext.tableState.meta ? listContext.tableState.meta.per_page : 20} // not respecting meta condition if null
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
