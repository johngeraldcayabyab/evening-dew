import React from 'react';
import {Button, Layout, Popconfirm, Space, Table} from "antd";
import useListState from "../Hooks/useListState";
import {Link, useHistory} from "react-router-dom";
import manifest from "./__manifest__.json";
import {DeleteOutlined, EyeOutlined} from "@ant-design/icons";
import TableCreateButton from "../components/ActionButtons/TableCreateButton";
import ControlPanel from "../components/ControlPanel";
import CustomTable from "../components/CustomTable";

const MeasurementList = () => {


    const [tableState, tableActions] = useListState(manifest, [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Ratio',
            dataIndex: 'ratio',
            key: 'ratio',
        },
        {
            title: 'Rounding Precision',
            dataIndex: 'rounding_precision',
            key: 'rounding_precision',
        },
        // {
        //     title: 'Action',
        //     dataIndex: '',
        //     key: 'x',
        //     render: (data) => {
        //         return (
        //             <Space>
        //                 <Button size={"small"} type="primary">
        //                     <Link to={`/${manifest.moduleName}/${data.id}`}><EyeOutlined/></Link>
        //                 </Button>
        //                 <Popconfirm title={`Are you sure delete this ${manifest.moduleName}?`} okText="Yes"
        //                             cancelText="No" onConfirm={() => {
        //                     tableActions.handleDelete(data.id);
        //                 }}>
        //                     <Button size={"small"} type="primary" danger>
        //                         <DeleteOutlined/>
        //                     </Button>
        //                 </Popconfirm>
        //             </Space>
        //         );
        //     }
        // },
    ]);

    return (
        <React.Fragment>
            <ControlPanel
                bottomColOneLeft={<TableCreateButton manifest={manifest}/>}
                bottomColOneRight={}
            />
            <CustomTable {...tableState} {...tableActions} manifest={manifest}/>
        </React.Fragment>
    )
};

export default MeasurementList;

