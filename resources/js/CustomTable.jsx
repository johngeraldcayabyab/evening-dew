import {Pagination, Table} from "antd";
import {useLoaderData, useSearchParams} from "react-router-dom";
import {useState} from "react";

const CustomTable = (props) => {
    const loaderData = useLoaderData();


    return (
        <>
            <Pagination
                size={'small'}
                // current={loaderData.meta.current_page}
                total={loaderData.meta.total}
                simple={true}
                pageSize={loaderData.meta.per_page}
                showSizeChanger={false}
                showQuickJumper
                // itemRender={}
                // onChange={(page, pageSize) => {
                //     console.log(page, pageSize);
                //     // const params = {
                //     //     page: page,
                //     //     pageSize: pageSize
                //     // };
                //     // tableContext.renderData(params)
                // }}
            />
            <Table
                dataSource={loaderData.data}
                columns={props.table.columns}
                rowKey={'id'}
                pagination={false}
                size={'small'}
                expandable={false}
            />
        </>
    );
};

export default CustomTable;
