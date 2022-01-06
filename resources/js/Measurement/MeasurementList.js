import React, {useRef} from 'react';
import useListState from "../Hooks/useListState";
import manifest from "./__manifest__.json";
import TableCreateButton from "../components/ActionButtons/TableCreateButton";
import ControlPanel from "../components/ControlPanel";
import CustomTable from "../components/CustomTable";
import ActionsDropdownButton from "../components/ActionButtons/ActionsDropdownButton";
import CustomPagination from "../components/CustomPagination";
import TableSearchInput from "../components/TableSearchInput";
import {Button, Input, Space} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const MeasurementList = () => {

    const [tableState, tableActions, columns] = useListState(manifest, [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                sorter: true,
                ...getColumnSearchProps('name')
            },
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
                sorter: true,
                ...getColumnSearchProps('type')
            },
            {
                title: 'Ratio',
                dataIndex: 'ratio',
                key: 'ratio',
                sorter: true,
            },
            {
                title: 'Rounding Precision',
                dataIndex: 'rounding_precision',
                key: 'rounding_precision',
                sorter: true,
            },
            {
                title: 'Category',
                dataIndex: 'measurement_category',
                key: 'measurement_category',
                sorter: true,
                render: (text, record) => {
                    return record.measurement_category.name;
                }
            },
            {
                title: 'Created At',
                dataIndex: 'created_at',
                key: 'created_at',
                sorter: true,
            }
        ]
    );

    function getColumnSearchProps(dataIndex) {
        return {
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
                <div style={{padding: 8}}>
                    <Input
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys}
                        onChange={e => setSelectedKeys(e.target.value ? e.target.value : null)}
                        onPressEnter={() => {
                            confirm();
                        }}
                        style={{marginBottom: 8, display: 'block'}}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => {
                                confirm();
                            }}
                            icon={<SearchOutlined/>}
                            size="small"
                            style={{width: 90}}
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => {
                                clearFilters();
                                // confirm();
                            }}
                            size={"small"}
                            style={{width: 90}}
                        >
                            Reset
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
        }
    }

    return (
        <React.Fragment>
            <ControlPanel
                topColTwoRight={
                    <TableSearchInput
                        {...tableState}
                        {...tableActions}
                        manifest={manifest}
                    />
                }
                bottomColOneLeft={<TableCreateButton manifest={manifest}/>}
                bottomColOneRight={
                    <ActionsDropdownButton
                        {...tableState}
                        {...tableActions}
                        manifest={manifest}
                    />
                }
                bottomColTwoRight={
                    <CustomPagination
                        {...tableState}
                        {...tableActions}
                        manifest={manifest}
                    />
                }
            />
            <CustomTable
                {...tableState}
                {...tableActions}
                columns={columns}
                manifest={manifest}
            />
        </React.Fragment>
    )
};

export default MeasurementList;
