import {Pagination, Skeleton} from "antd";
import {TableContext} from "../../Contexts/TableContext";
import {useContext} from "react";

const CustomPagination = () => {
    const tableContext = useContext(TableContext);

    if (tableContext.state.loading) {
        return (<Skeleton.Input
            className={'ant-skeleton-element-custom'}
            style={{display: 'block', width: '100%'}}
            active={true}
        />);
    }

    return (
        <Pagination
            size={'small'}
            current={tableContext.state.meta ? tableContext.state.meta.current_page : 1}
            total={tableContext.state.meta ? tableContext.state.meta.total : 1}
            simple={true}
            pageSize={tableContext.state.meta ? tableContext.state.meta.per_page : 20} // not respecting meta condition if null
            showSizeChanger={false}
            showQuickJumper
            onChange={(page, pageSize) => {
                const params = {
                    page: page,
                    pageSize: pageSize
                };
                tableContext.renderData(params)
            }}
        />
    )
}

export default CustomPagination;
