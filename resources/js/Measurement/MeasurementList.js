import React from 'react';
import {Button, Layout, Popconfirm, Space, Table} from "antd";
import useListState from "../Hooks/useListState";
import {Link, useHistory} from "react-router-dom";
import manifest from "./__manifest__.json";
import {DeleteOutlined, EyeOutlined} from "@ant-design/icons";
import TableCreateButton from "../components/ActionButtons/TableCreateButton";
import ControlPanel from "../components/ControlPanel";
import CustomTable from "../components/CustomTable";
import ActionsDropdownButton from "../components/ActionButtons/ActionsDropdownButton";

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
        ])
    ;

    return (
        <React.Fragment>
            <ControlPanel
                bottomColOneLeft={<TableCreateButton manifest={manifest}/>}
                bottomColOneRight={<ActionsDropdownButton {...tableState} {...tableActions} manifest={manifest}/>}
            />
            <CustomTable {...tableState} {...tableActions} manifest={manifest}/>
        </React.Fragment>
    )
};

export default MeasurementList;

