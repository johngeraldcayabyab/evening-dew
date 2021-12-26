import {Pagination} from "antd";

const CustomPagination = () => {
    return (
        <Pagination
            size={'small'}
            defaultCurrent={2}
            total={50}
            pageSize={30}
            pageSizeOptions={[30, 50, 60, 100]}
        />
    )
}

export default CustomPagination;
