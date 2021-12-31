import {Pagination} from "antd";

const CustomPagination = (props) => {
    return (
        <Pagination
            size={'small'}
            current={props.meta ? props.meta.current_page : 1}
            total={props.meta ? props.meta.total : 1}
            pageSize={80} // not respecting meta condition if null
            showSizeChanger={false}
            showQuickJumper
            onChange={(page, pageSize) => {
                props.params.page = page;
                props.renderData(props.params);
            }}
        />
    )
}

export default CustomPagination;
