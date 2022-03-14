import React, {useRef} from 'react';
import useListState from "../../Hooks/useListState";
import manifest from "./__manifest__.json";
import TableCreateButton from "../../components/TableButtons/TableCreateButton";
import ControlPanel from "../../components/ControlPanel";
import CustomTable from "../../components/CustomTable";
import ActionsDropdownButton from "../../components/TableButtons/ActionsDropdownButton";
import CustomPagination from "../../components/CustomPagination";
import TableSearchInput from "../../components/TableSearchInput";
import {Button, Input, Space} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const MaterialList = () => {

    const [tableState, tableActions, columns] = useListState(manifest, [
            {
                title: 'Product',
                dataIndex: 'product',
                key: 'product',
                sorter: true,
                searchFilter: true,
                render: (text, record) => {
                    return record.product.name;
                }
            },
            {
                title: 'Reference',
                dataIndex: 'reference',
                key: 'reference',
                sorter: true,
                searchFilter: true,
            },
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
                sorter: true,
                searchFilter: true,
            },
            {
                title: 'Created At',
                dataIndex: 'created_at',
                key: 'created_at',
                sorter: true,
            }
        ]
    );

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

export default MaterialList;
