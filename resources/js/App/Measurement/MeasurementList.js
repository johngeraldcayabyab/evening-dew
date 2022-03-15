import React from 'react';
import useListState from "../../Hooks/useListState";
import manifest from "./__manifest__.json";
import TableCreateButton from "../../Components/TableButtons/TableCreateButton";
import ControlPanel from "../../Components/ControlPanel";
import CustomTable from "../../Components/CustomTable";
import ActionsDropdownButton from "../../Components/TableButtons/ActionsDropdownButton";
import CustomPagination from "../../Components/CustomPagination";
import TableSearchInput from "../../Components/TableSearchInput";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";

const MeasurementList = () => {
    const [tableState, tableActions, columns] = useListState(manifest, [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
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
                title: 'Ratio',
                dataIndex: 'ratio',
                key: 'ratio',
                sorter: true,
                searchFilter: true,
            },
            {
                title: 'Rounding Precision',
                dataIndex: 'rounding_precision',
                key: 'rounding_precision',
                sorter: true,
                searchFilter: true,
            },
            {
                title: 'Category',
                dataIndex: 'measurement_category',
                key: 'measurement_category',
                sorter: true,
                searchFilter: true,
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
                topColOneLeft={<CustomBreadcrumb tableState={tableState}/>}
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
