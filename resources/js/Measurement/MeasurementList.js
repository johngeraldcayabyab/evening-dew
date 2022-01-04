import React from 'react';
import useListState from "../Hooks/useListState";
import manifest from "./__manifest__.json";
import TableCreateButton from "../components/ActionButtons/TableCreateButton";
import ControlPanel from "../components/ControlPanel";
import CustomTable from "../components/CustomTable";
import ActionsDropdownButton from "../components/ActionButtons/ActionsDropdownButton";
import CustomPagination from "../components/CustomPagination";
import TableSearchInput from "../components/TableSearchInput";

const MeasurementList = () => {

    const [tableState, tableActions, columns] = useListState(manifest, [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                filterDropdown: (setSelectedKeys, selectedKeys, confirm, clearFilters) => {
                    return (
                        <div>hello</div>
                    )
                },
                sorter: true,
            },
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
                sorter: true,
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
