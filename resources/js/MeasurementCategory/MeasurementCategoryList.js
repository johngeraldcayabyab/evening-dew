import React from 'react';
import {Button, Col, Layout, Popconfirm, Row, Space, Table} from "antd";
import useListState from "../Hooks/useListState";
import {Link} from "react-router-dom";
import manifest from "./__manifest__.json";
import {DeleteOutlined, EyeOutlined} from "@ant-design/icons";
import TableCreateButton from "../components/ActionButtons/TableCreateButton";
import CustomBreadcrumb from "../components/CustomBreadcrumb";
import ControlPanel from "../components/ControlPanel";

const MeasurementCategoryList = () => {
    const [tableState, tableActions] = useListState(manifest);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (data) => {
                return (
                    <Space>
                        <Button size={"small"} type="primary">
                            <Link to={`/${manifest.moduleName}/${data.id}`}><EyeOutlined/></Link>
                        </Button>
                        <Popconfirm title={`Are you sure delete this ${manifest.moduleName}?`} okText="Yes"
                                    cancelText="No" onConfirm={() => {
                            tableActions.handleDelete(data.id);
                        }}>
                            <Button size={"small"} type="primary" danger>
                                <DeleteOutlined/>
                            </Button>
                        </Popconfirm>
                    </Space>
                );
            }
        },
    ];

    return (
        <React.Fragment>
            <ControlPanel
                bottomLeft={<TableCreateButton manifest={manifest}/>}
            />

            <Table
                loading={tableState.loading}
                size={'small'}
                dataSource={tableState.dataSource}
                columns={columns}
                rowKey={'id'}
            />
        </React.Fragment>
    )
};

export default MeasurementCategoryList;

